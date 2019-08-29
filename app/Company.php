<?php

namespace App;
use App\User;
use App\Practise;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name', 'email', 'address', 'phone', 'OIB', 'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function practise(){
        return $this->hasMany(Practise::class);
    }
}
