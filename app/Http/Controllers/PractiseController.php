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
            $practises = Practise::with('company')->where('company_id', $user->id)->where('status', '!=' , 'locked')->get();
            $student = Company::with('user')->where('user_id', $user->id)->get();
        }
        else if($user->role == 'Student'){
            $practises = Practise::with('company')->get();
            $student = Student::with('user')->where('user_id', $user->id)->get();
        }
        else if($user->role == 'Fakultet'){
            $practises = Practise::with('company')->get();
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
        
        $practise = new Practise;

        //ovdje dodaj koja polja treba ispunit za praksu
        $practise->name = $request->input('name');
        $practise->description = $request->input('description');
        $practise->faculties = $request->input('faculties');        //ovo će ić posebno 
        $practise->start = $request->input('start');
        $practise->status = $request->input('status');
        $practise->company_id = $company->id;
        $practise->candidates = [];
        
        if($practise->save()){
            return $practise;
        }
        
        //return $request->input('faculties');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$practise = Practise::with('company')->where('id', $id)->get();
        //$practise = Practise::with('company')->find($id);
        //$practise = Practise::find($id)->company()->get();
        //$practise = Practise::where('id',$id)->get();
        
        //$practise = Practise::find($id)->company->phone;
        $practise = Practise::with('company')->where('id', $id)->get();
        
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
            //$practise = Practise::findOrFail($id);
            //dd(request()->all());
            if($request->input('name') == null){
                //return $request->input('candidates');
                $array = [];
                $candidate = $request->input('candidates');
                //$candid = $candidate[0];
                //return $candidate[0]['id'];
                //DOHVATI SVE PRAKSE NA KOJIMA JE STUDENT BIO PRIJAVLJEN TE GA IZBRIŠI 
                //I POSTAVI NA SAMO JEDNU (ONU NA KOJU JE ODOBREN)
                $practises = Practise::where('status', 'free')->get();
                    foreach ($practises as $pr) {
                        foreach($pr->candidates as $cand) {
                            if($cand['id'] == $candidate[0]['id']){
                                //array_push($array, $pr['id']);
                                //dd($pr);
                                $c = Practise::where('id',$pr['id'])->first();
                                //return $c;
                                $array = $c->candidates;
                                //return $array;
                                $found_key = array_search($cand['id'], array_column($array, 'id'));
                                //return $found_key;
                                array_splice($array, $found_key,1);
                                //return $array;
                                $c->candidates = $array;
                                $c->save();
                                //return $c;
                                // $key = array_search('green', $array);
                                // $c->candidates
                            }
                            //return $array;
                        }
                        //array_push($array, '/');
                    }
                
                //$ca = Practise::find()
                //return $found_key;
                
                
                //return $practises;
                //$candidate = User::where('id', $request->input('id'))->first();
                //return $candidate;
                // $obj = (object)array(
                //     'id' => $candidate->id,
                //     'name' => $candidate->name,
                //     'email' => $candidate->email,
                // );
                // //return response()->json($obj);
                // $array = [];
                // array_push($array, $obj);
                

                //$candidate = Practise::where('id', $id)->update(array('status' => 'taken'));
                //$candidate = Practise::where('id', $id)->update(array('candidates' => $request->input('candidates')));
                //$practise = Practise::find($id);
                //$practise->update(['candidates' => $array]);
                //return $request->input('candidates');
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
                $practise->faculties = $request->input('faculties');        //ovo će ić posebno 
                $practise->start = $request->input('start');
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

            //$name = $user->name;
            // $practise = Practise::where('id', $id);
            // $array = [];
            // if($request->input('candidates') !=null){
            //     $array = $request->input('candidates');
            // }
            
            // foreach ($array as $key) {
            //     if($name == $key){
            //         return 'already applied';
            //     }
            // }
            //if($name == $array[i]) return 'već ste prijavljeni'
            
            //array_push($array, $name);
            //$candidates = Practise::where('id', $id)->update(array('candidates' => $array));
            //$candidates = Practise::where('id', $id)->setAttribute('candidates', $array);
            //return $candidates;   

            //prijavljivanje/odjavljivanje na praksu
            $practise = Practise::find($id);
            //$practise->update(['candidates' => $array]);
            $practise->candidates = $request->input('candidates');
            $practise->save();
            return $practise;
        }

        
        

        //$Id = auth()->user()->id;
        

        //$user = User::where('id', $user_id)->update(array('name' => $request->input('name')));

        //$user = User::where('id', $Id)->update(array('email' => $request->input('email')));

        
        //return $request->input('faculties');
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
