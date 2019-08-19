<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = [
        'name', 'university', 'address', 'phone', 'email', 'OIB', 'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
