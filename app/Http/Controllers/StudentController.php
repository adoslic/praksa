<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;
use App\Faculty;
use App\User;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $faculty = auth()->user()->name;

        // $students = Student::where('faculty', $faculty)->get();
        // $users = User::where('role', 'Student')->get();
        // return [$users, $students];

        //DOHVATI SVE STUDENTE KOJI SU NA TOM FAKSU
        //$user_name = auth()->user()->name;
        //$user = User::find($user_id)->get();
        //$user = User::where('id',$user_id);
        //return $user->student;


        //$student = User::find($user_name)->student()->where('faculty', $user_name);
        
        // $student = User::find($faculty)->student()->get();
        // $student = User::all()->where()
        //////$users = Student::where('faculty', $faculty)->get();

        //$student = User::find()->student()->where('faculty', $faculty);

        //$users = User::student()->where('faculty', $faculty);

        //$users = Student::where('faculty', $faculty)->user()->first();
        //$comment = Post::find(1)->comments()->where('faculty', $faculty)->get();

        //$student = Student::where('faculty', '=', $faculty)->get();

        //$user = Student::find(1)->user->get();
        //$student = User::find(3)->student;
        //$student = Student::where('faculty', $faculty);
        
        /////$student = Student::with('user')->where('faculty', $faculty)->get();
        //$student = Student::where('faculty', $faculty)->user()->get();

        
        // $student = Student::whereHas('user', function ($query) {
        //     $query->where('faculty', '=', $faculty);
        // })->get();

        //$students = Student::with('user')->get();

        //$array = [];
        $students = Student::with('user')->where('faculty', $faculty)->get();

        // foreach ($students as $student) {
        //     $studentName = $student->user->name;
        //     array_push($array, $studentName);
        // }

        
        return $students;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $faculty = auth()->user()->name;
        //return $faculty;

        $student = new Student;
        //$student->name = $request->input('name');
        //$student->lastName = $request->input('lastName', '');
        //$student->email = $request->input('email');
        $student->indexNumber = $request->input('indexNumber', '');
        $student->faculty = $faculty;
        $student->study = $request->input('study', '');
        $student->course = $request->input('course', '');
        $student->yearsOfStudy = $request->input('yearsOfStudy', '');
        $student->OIB = $request->input('OIB', '');
        $student->user_id = $request->input('user_id');

        
        if($student->save()){
            return $student;
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
        // $student = Student::findOrFail($id);
        // $user = User::where('id',$student->user_id)->get();
        // return [$user, $student];
        //return $student->user_id;

        $student = Student::with('user')->where('id', $id)->get();
        //$students = Student::with('user')->where('faculty', $faculty)->get();
        //$student = User::find(3)->student;
        return $student;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $student = Student::findOrFail($id);
        // $user = User::where('id',$student->user_id)->get();
        // return [$user, $student];

        $student = Student::with('user')->where('id', $id)->get();
        //$students = Student::with('user')->where('faculty', $faculty)->get();
        //$student = User::find(3)->student;
        return $student;
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
        $student = Student::findOrFail($id);
        //$student->name = $request->input('name');
        //$student->lastName = $request->input('lastName');
        //$student->email = $request->input('email');
        $student->indexNumber = $request->input('indexNumber');
        $student->faculty = $request->input('faculty');
        $student->study = $request->input('study');
        $student->course = $request->input('course');
        $student->yearsOfStudy = $request->input('yearsOfStudy');
        //$student->OIB = $request->input('OIB');

        //$Id = auth()->user()->id;
        $user_id = $request->input('user_id');

        $user = User::where('id', $user_id)->update(array('name' => $request->input('name')));

        //$user = User::where('id', $Id)->update(array('email' => $request->input('email')));

        if($student->save()){
            return $student;
        }
        //return $student;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        if($student->delete()){
            return $student;
        }
    }
}
