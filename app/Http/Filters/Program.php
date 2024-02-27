<?php

namespace App\Http\Filters;

use App\Models\Exercise;
use App\Models\Feature;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = ["header", "description", "image"];

    public function exercises(): BelongsToMany
    {
        return $this->belongsToMany(Exercise::class, 'program_exercise');
    }

    public function features(): HasMany
    {
        return $this->hasMany(Feature::class);
    }

    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        $filter->apply($builder);
    }
}
