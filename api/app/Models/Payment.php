<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    

    protected $fillable = [
        'id',
        'price_contracted',
        'balance',
        'price_paid',
        'type_payment',
        'status',
        'type_invoice',
        'contract_id',
        'created_at',
        'updated_at'
    ];

}