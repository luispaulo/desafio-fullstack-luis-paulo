<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contract extends Model
{

    protected $hidden = ['created_at', 'updated_at'];

    protected $fillable = [
        'price', 'active', 'user_id', 'plan_id', 'hiring_date', 'created_at', 'updated_at'
    ];

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function scopeIsActive(Builder $query, int $userId)
    {
        return $query->where('active', true)
                        ->where('user_id', $userId);
    }

}