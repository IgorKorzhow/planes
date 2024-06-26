<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plane extends Model
{
    use HasFactory;

    protected $fillable = [
        'model',
        'creation_date',
        'serial_number',
        'basic_seats_number',
        'premium_seats_number',
        'firm_id',
        'img_url'
    ];

    protected $casts = [
        'creation_date' => 'date:Y-m-d'
    ];

    public function firm(): BelongsTo
    {
        return $this->belongsTo(PlaneFirm::class, 'firm_id');
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'plane_id');
    }
}
