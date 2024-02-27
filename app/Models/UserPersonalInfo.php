<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPersonalInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'country',
        'passport_number',
        'registration',
        'birth_date',
    ];
}
