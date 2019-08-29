<?php

namespace App;
use App\Company;
use App\Report;

use Illuminate\Database\Eloquent\Model;

class Practise extends Model
{
    protected $fillable = [
        'name', 'description', 'company_id', 'faculties', 'start', 'status', 'candidates'
    ];

    protected $casts = [
        'faculties' => 'array',
        'candidates' => 'array',
    ];

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function report(){
        return $this->hasOne(Practise::class);
    }
}
