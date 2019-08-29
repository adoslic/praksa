<?php

namespace App;
use App\Practise;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'practise_id', 'student_id', 'grade', 'comment', 'file',
    ];

    public function practise(){
        return $this->belongsTo(Report::class, 'practise_id');
    }
}
