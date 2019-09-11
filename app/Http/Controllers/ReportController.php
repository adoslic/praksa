<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Report;
use App\Practise;
use App\Company;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user(); 
        
        if($user->role == 'Tvrtka'){
            $company = Company::with('user')->where('user_id', $user->id)->get();
            $practises = Practise::with('company')->where('company_id', $company[0]->id)->where('status', 'finished')->get();
            $reports = Report::all();
        }
        if($user->role == 'Fakultet'){
            $practises = Practise::with('company')->where('status', 'finished')->get();
            $reports = Report::with('practise')->where('grade', '<>', '')->where('facultyGrade', '')->get();
        }
        
        if($user->role == 'Student'){
            $practises = [];
            $reports = Report::with('practise')->where('student_id', $user->id)->first();
        }
        return [$practises, $reports];
        
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
        

        if($request->hasFile('file')) {
            
                $user = auth()->user();
                if($request->fileName){
                    $fileNameToStore = $request->fileName;
                    
                }
                else{
                    
                    $userName = $user->name;
                    
                    //makni razmak iz imena da bi napravio ime fajla
                    $userName = preg_replace('/\s/', '', $userName);
                    
                    //file extension
                    $extension = $request->file('file')->getClientOriginalExtension();
                    
                    $fileNameToStore = $userName.'_'.time().'.'.$extension;
                    
                }
                
                $path = $request->file('file')->storeAs('public/report', $fileNameToStore);

                $report = Report::where('student_id', $user->id)->first();
                
                if($report == []){
                    
                    $report = new Report;
                    $report->practise_id = $request->practise_id;
                    $report->student_id = $user->id;
                    $report->grade = '';
                    $report->comment = '';
                    $report->facultyGrade = '';
                    $report->facultyComment = '';
                }
                
                    $report->file = $fileNameToStore;
                    $report->save();
                    return $report;
            
        }
        
        
        return 'No File';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //ovo je id prakse
        $report = Report::where('practise_id', $id)->first();
        return $report;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //return $request;
        $user = auth()->user();

        if($user->role == 'Tvrtka'){
            if($request->hasFile('file')) {
                
                    $fileNameToStore = $request->fileName;
                    $path = $request->file('file')->storeAs('public/report', $fileNameToStore);
                
            }
            //ako neće uploadat file
            
            $report = Report::where('practise_id', $id)->first();
            if($request->grade != null){
                $report->grade = $request->grade;
            }
            else{
                $report->grade = '';
            }
            if($request->comment != null){
                $report->comment = $request->comment;
            }
            else{
                $report->comment = '';
            }
            $report->save();
            return $report;
        }
        else if($user->role == 'Fakultet'){
            if($request->hasFile('file')) {
                
                    $fileNameToStore = $request->fileName;
                    $path = $request->file('file')->storeAs('public/report', $fileNameToStore);
                
            }
            //ako neće uploadat file
            
            $report = Report::where('practise_id', $id)->first();

            //ako fakultet upiše ocjenu onda je to kraj tj ponuda ocjene studetnu
            //ako student prihvati to je to, ako ne onda ponovo mora slat firmi(briši ocjenu)

            if($request->facultyGrade){
                $report->facultyGrade = $request->facultyGrade;
            }
            if($request->facultyComment){
                $report->facultyComment = $request->facultyComment;
            }
            $report->save();
            return $report;
        } 
        else if($user->role == 'Student'){
           
            $report = Report::where('practise_id', $id)->first();
            $report->grade = '';
            
            $report->facultyGrade = '';
            
            $report->save();
            return $report;
        }
        // dd(request()->all());
        // return 'ok';
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
