<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'name', 'lastName', 'email', 'indexNumber', 'faculty', 'study', 'course', 'yearsOfStudy', 'OIB', 'user_id'
    ];

    // public function user(){
    //     return $this->hasOne(User::class,'user_id');
    // }
}
