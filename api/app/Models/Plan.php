<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'id','description','numberOfClients','gigabytesStorage','price','active'
    ]; 
}
