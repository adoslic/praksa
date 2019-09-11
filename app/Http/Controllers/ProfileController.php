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
        $user = auth()->user();

        
        if($user->role == 'Student'){
            $profiles = Student::with('user')->where('user_id', $user->id)->get();
        }
        else if($user->role == 'Tvrtka'){
            $profiles = Company::with('user')->where('user_id', $user->id)->get();
        }
        else if($user->role == 'Fakultet'){
            $profiles = Faculty::with('user')->where('user_id', $user->id)->get();
        }

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
        else if($role == 'Fakultet'){
            $table = 'faculties';
            $columns = Schema::getColumnListing($table);
        }
        else if($role == 'Student'){
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
        
        $user = auth()->user();

        if($user->role == 'Student'){
            $profile = new Student;

            foreach ($request->input('course') as &$value) {
                $value = ucfirst($value);
            }
            return $request->input('course');
            //ovdje dodaj koja polja treba ispunit za studente
            
            $profile->indexNumber = $request->input('indexNumber');
            $profile->faculty = $request->input('faculty');
            $profile->study = $request->input('study');
            $profile->course = $request->input('course');
            $profile->yearsOfStudy = $request->input('yearsOfStudy');
            $profile->OIB = $request->input('OIB');
            $profile->user_id = $user->id;
        }
        else if($user->role == 'Tvrtka'){
            $profile = new Company;

            //ovdje dodaj koja polja treba ispunit za tvrtku
            
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->OIB = $request->input('OIB');
            $profile->user_id = $user->id;
        }
        else if($user->role == 'Fakultet'){
            $arrayCourses = $request->input('courses');
            foreach ($arrayCourses as &$value) {
                $value = strtolower($value);
                $value = ucfirst($value);
            }
            $profile = new Faculty;
            $profile->university = $request->input('university');
            $profile->courses = $arrayCourses;
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->OIB = $request->input('OIB');
            $profile->user_id = $user->id;  
        }
        
        
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
        $profile = Student::with('user')->where('user_id', $id)->get();
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
        
        $user = auth()->user();

        if($user->role == 'Tvrtka'){
            
            $profile = Company::with('user')->where('user_id', $user->id)->get();
            
        }
        else if($user->role == 'Fakultet'){
            
            $profile = Faculty::with('user')->where('user_id', $user->id)->get();
           
        }
        else if($user->role =='Student'){
            
            $profile = Student::with('user')->where('user_id', $user->id)->get();
            
        }

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
        
        $user = auth()->user();

        if($user->role == 'Tvrtka'){
            $profile = Company::findOrFail($id);
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->OIB = $request->input('OIB');

        }
        else if($user->role == 'Fakultet'){
            //prvo veliko slovo svake riječi
            $arrayCourses = $request->input('courses');
            foreach ($arrayCourses as &$value) {
                $value = strtolower($value);
                $value = ucfirst($value);
            }
            $profile = Faculty::findOrFail($id);
            
            $profile->university = $request->input('university');
            $profile->courses = $arrayCourses;
            $profile->address = $request->input('address');
            $profile->phone = $request->input('phone');
            $profile->OIB = $request->input('OIB');


        }
        else if($user->role =='Student'){
            $profile = Student::findOrFail($id);
            $profile->indexNumber = $request->input('indexNumber');
            $profile->faculty = $request->input('faculty');
            $profile->study = $request->input('study');
            $profile->course = $request->input('course');
            $profile->yearsOfStudy = $request->input('yearsOfStudy');
            $profile->OIB = $request->input('OIB');

        }


        $Name = User::where('id', $user->id)->update(array('name' => $request->input('name')));
        $Email = User::where('id', $user->id)->update(array('email' => $request->input('email')));
        
        if($profile->save()){
            return $profile;
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
        //nema smisla da se profil briše, samo uređuje
        $role = auth()->user()->role;
        if($role == 'Tvrtka'){
            $profile = Company::findOrFail($id);
        }
        else if($role == 'Fakultet'){
            $profile = Faculty::findOrFail($id);
        }
        else if($role =='Student'){
            $profile = Student::findOrFail($id);
        }
        

        if($profile->delete()){
            return $profile;
        }
    }
}
