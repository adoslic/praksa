<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name', 'email', 'address', 'phone', 'OIB', 'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
