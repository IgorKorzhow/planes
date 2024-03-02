<?php

namespace App\Models;

use App\Http\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'plane_id',
        'departure_city',
        'arrival_city',
        'departure_date_time',
        'arrival_date_time',
        'ticket_price_basic_place',
        'ticket_price_premium_place',
        'status'
    ];

    protected $casts = [
        'departure_date_time' => 'datetime',
        'arrival_date_time' => 'datetime',
    ];

    public function plane(): BelongsTo
    {
        return $this->belongsTo(Plane::class, 'plane_id');
    }

    public function places(): HasMany
    {
        return $this->hasMany(Place::class);
    }

    public function boughtPlaces(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        $filter->apply($builder);
    }
}
