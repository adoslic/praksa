<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = [
        'name', 'university', 'courses', 'address', 'phone', 'email', 'OIB', 'user_id'
    ];
    protected $casts = [
        'courses' => 'array',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
