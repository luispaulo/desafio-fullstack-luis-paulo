<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $hidden = ['created_at', 'updated_at'];
    
    protected $fillable = [
        'name','email','created_at', 'updated_at'
    ];
}
