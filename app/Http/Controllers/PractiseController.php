<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Schema;
use App\Company;
use App\Practise;
use App\Student;
use App\Faculty;
use App\User;

use Illuminate\Http\Request;

class PractiseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$student = [];
        $user = auth()->user();

        if($user->role == 'Tvrtka'){
            $student = Company::with('user')->where('user_id', $user->id)->get();
            $practises = Practise::with('company.user')->where('company_id', $student[0]->id)->get();
            //$student = Company::with('user')->where('user_id', $user->id)->get();
        }
        else if($user->role == 'Student'){
            $practises = Practise::with('company.user')->get();
            $student = Student::with('user')->where('user_id', $user->id)->get();
        }
        else if($user->role == 'Fakultet'){
            $practises = Practise::with('company.user')->get();
            $student = Faculty::with('user')->where('user_id', $user->id)->get();
        }
        
        return [$practises, $student];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $table = 'practises';
        $columns = Schema::getColumnListing($table);
        $faculties = User::where('role','Fakultet')->get();
        return [$columns, $faculties];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $company = auth()->user();
        
        $companyColumn = Company::where('user_id', $company->id)->first();
        
        $practise = new Practise;

        //ovdje dodaj koja polja treba ispunit za praksu
        $practise->name = $request->input('name');
        $practise->description = $request->input('description');
        $practise->faculties = $request->input('faculties');
        $practise->start = $request->input('start');
        $practise->duration = $request->input('duration');
        $practise->status = $request->input('status');
        $practise->company_id = $companyColumn->id;
        $practise->candidates = [];
        
        if($practise->save()){
            return $practise;
        }
        
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $practise = Practise::with('company.user')->where('id', $id)->get();
        
        return $practise;
        //return 5;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $practise = Practise::with('company')->where('id', $id)->get();
        $faculties = User::where('role','Fakultet')->get();
        return [$practise, $faculties];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = auth()->user();

        if($user->role == 'Tvrtka'){
            
            if($request->input('name') == null){
                
                $array = [];
                $candidate = $request->input('candidates');
                //DOHVATI SVE PRAKSE NA KOJIMA JE STUDENT BIO PRIJAVLJEN TE GA IZBRIŠI 
                //I POSTAVI NA SAMO JEDNU (ONU NA KOJU JE ODOBREN)
                $practises = Practise::where('status', 'free')->get();
                    foreach ($practises as $pr) {
                        foreach($pr->candidates as $cand) {
                            if($cand['id'] == $candidate[0]['id']){
                                
                                $c = Practise::where('id',$pr['id'])->first();
                                
                                $array = $c->candidates;
                                
                                $found_key = array_search($cand['id'], array_column($array, 'id'));
                                
                                array_splice($array, $found_key,1);
                                
                                $c->candidates = $array;
                                $c->save();
                            }
                        }
                    }
                
                $practise = Practise::findOrFail($id);
                $practise->status = 'taken';
                $practise->candidates = $request->input('candidates');
                $practise->save();
                return $practise;
            }
            else{
                $practise = Practise::findOrFail($id);
                $practise->name = $request->input('name');
                $practise->description = $request->input('description');
                $practise->faculties = $request->input('faculties'); 
                $practise->start = $request->input('start');
                $practise->duration = $request->input('duration');
                $practise->status = $request->input('status');
                $practise->company_id = $request->input('company_id');

                if ($request->input('candidates') == null) {
                    $practise->candidates = [];
                }
                else{
                    $practise->candidates = $request->input('candidates');
                }
                if($practise->save()){
                    return $practise;
                }
            }
            
            
        }
        else if ($user->role == 'Student'){
            //prihvačanje ocijene iz prakse
            if($request->input('facultyGrade')){
                $practise = Practise::where('id', $id)->first();
                $practise->status = 'locked';
                $practise->save();
                return $practise;
            }

            else if($request->input('status')){
                $practise = Practise::where('id', $id)->first();
                $practise->status = 'finished';
                $practise->save();
                return $practise;
            }

            //prijavljivanje/odjavljivanje na praksu
            $practise = Practise::find($id);
            $practise->candidates = $request->input('candidates');
            $practise->save();
            return $practise;
        }

        else if($user->role == 'Fakultet'){
            $practise = Practise::find($id);
            $practise->status = $request->input('status');
            $practise->save();
            return $practise;
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $practise = Practise::findOrFail($id);
        if($practise->delete()){
            return $practise;
        }
    }
}
