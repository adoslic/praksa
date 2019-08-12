<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Faculty;
use App\Student;
use App\Company;
use App\User;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //prilikom otvaranja profila treba dohvatit id logiranog korisnika te prikazati njegovo ime i mail

        //prilikom spremanja treba spremiti id logiranog korisnika pod user_id uloge
        

        //DOHVATI ID KORISNIKA KOJI JE LOGIRAN
        $id = auth()->user()->id;
        $role = auth()->user()->role;

        //$profiles = [];
        if($role == 'Student'){
            $profiles = Student::where('user_id', $id)->get();
        }
        elseif($role == 'Tvrtka'){
            $profiles = Company::where('user_id', $id)->get();
        }
        elseif($role == 'Fakultet'){
            $profiles = Faculty::where('user_id', $id)->get();
        }

        //$profiles = User::where('id', $id)->get();
        return $profiles;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //provjeri ulogu
        //vrati podatke koji se zahtjevaju od korisnika

        $role = auth()->user()->role;
        if($role == 'Tvrtka'){
            $table = 'companies';
            $columns = Schema::getColumnListing($table);
        }
        elseif($role == 'Fakultet'){
            $table = 'faculties';
            $columns = Schema::getColumnListing($table);
        }
        elseif($role == 'Student'){
            $table = 'students';
            $columns = Schema::getColumnListing($table);
        }
        return $columns;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)     
    {
        //radi
        $user_id = auth()->user()->id;

        $role = auth()->user()->role;
        // $profile = $request->isMethod('put')?
        // Faculty::findOrFail($request->id): new Faculty;
        if($role == 'Student'){
            $profile = new Student;

            //ovdje dodaj koja polja treba ispunit za studente
            $profile->name = $request->input('name');
            $profile->lastName = $request->input('lastName');
            $profile->email = $request->input('email');
            $profile->indexNumber = $request->input('indexNumber');
            $profile->faculty = $request->input('faculty');
            $profile->study = $request->input('study');
            $profile->course = $request->input('course');
            $profile->yearsOfStudy = $request->input('yearsOfStudy');
            $profile->OIB = $request->input('OIB');
            $profile->user_id = $user_id;
        }
        else if($role == 'Tvrtka'){
            $profile = new Company;

            //ovdje dodaj koja polja treba ispunit za tvrtku
            $profile->name = $request->input('name');
            $profile->email = $request->input('email');
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->OIB = $request->input('OIB');
            $profile->user_id = $user_id;
        }
        else if($role == 'Fakultet'){
            $profile = new Faculty;
            //$profile->id = $request->input('id');
            $profile->name = $request->input('name');
            $profile->university = $request->input('university');
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->email = $request->input('email');
            $profile->OIB = $request->input('OIB');
            $profile->user_id = $user_id;
        }
        
        //$profile->user_id = $user_id;
        //return $request;
        if($profile->save()){
            return $profile;
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
        //radi
        $role = auth()->user()->role;
        if($role == 'Tvrtka'){
            $profile = Company::findOrFail($id);
        }
        elseif($role == 'Fakultet'){
            $profile = Faculty::findOrFail($id);
        }
        elseif($role =='Student'){
            $profile = Student::findOrFail($id);
        }
        

        return $profile;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //radi
        $role = auth()->user()->role;
        if($role == 'Tvrtka'){
            $profile = Company::findOrFail($id);
        }
        elseif($role == 'Fakultet'){
            $profile = Faculty::findOrFail($id);
        }
        elseif($role =='Student'){
            $profile = Student::findOrFail($id);
        }

        //$profile = Faculty::findOrFail($id);
        return $profile;
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
        //radi
        //pazi da napraviš POST request, ali postaviš _method=PUT
        $role = auth()->user()->role;
        if($role == 'Tvrtka'){
            $profile = Company::findOrFail($id);
            $profile->name = $request->input('name');
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->email = $request->input('email');
            $profile->OIB = $request->input('OIB');
        }
        elseif($role == 'Fakultet'){
            $profile = Faculty::findOrFail($id);
            $profile->name = $request->input('name');
            $profile->university = $request->input('university');
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->email = $request->input('email');
            $profile->OIB = $request->input('OIB');

        }
        elseif($role =='Student'){
            $profile = Student::findOrFail($id);
            $profile->lastName = $request->input('lastName');
            $profile->email = $request->input('email');
            $profile->indexNumber = $request->input('indexNumber');
            $profile->faculty = $request->input('faculty');
            $profile->study = $request->input('study');
            $profile->course = $request->input('course');
            $profile->yearsOfStudy = $request->input('yearsOfStudy');
            $profile->OIB = $request->input('OIB');
        }


        if($profile->save()){
            return $profile;
        }
        //$input = $request->all();
       
        //return $request;

        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)        
    {
        //nema smisla da se profil briše, samo uređuje
        $role = auth()->user()->role;
        if($role == 'Tvrtka'){
            $profile = Company::findOrFail($id);
        }
        elseif($role == 'Fakultet'){
            $profile = Faculty::findOrFail($id);
        }
        elseif($role =='Student'){
            $profile = Student::findOrFail($id);
        }
        //$profile = Faculty::findOrFail($id);

        if($profile->delete()){
            return $profile;
        }
    }
}
