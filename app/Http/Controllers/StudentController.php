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

        $students = Student::with('user')->where('faculty', $faculty)->get();

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
        

        $student = new Student;
        
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
        $student = Student::with('user')->where('id', $id)->get();
        
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

        $student = Student::with('user')->where('id', $id)->get();
        
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
        
        $student->indexNumber = $request->input('indexNumber');
        $student->faculty = $request->input('faculty');
        $student->study = $request->input('study');
        $student->course = $request->input('course');
        $student->yearsOfStudy = $request->input('yearsOfStudy');

        $user_id = $request->input('user_id');

        $user = User::where('id', $user_id)->update(array('name' => $request->input('name')));

        if($student->save()){
            return $student;
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
        $student = Student::findOrFail($id);
        if($student->delete()){
            return $student;
        }
    }
}
