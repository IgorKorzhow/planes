<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'is_available',
        'number',
        'plane_id'
    ];

    public function plane(): BelongsTo
    {
        return $this->belongsTo(Plane::class);
    }
}
