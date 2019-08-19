<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Practise extends Model
{
    protected $fillable = [
        'name', 'description', 'company', 'faculties', 'begin', 'status', 'comment'
    ];
}
