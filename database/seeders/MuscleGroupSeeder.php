<?php

namespace Database\Seeders;

use App\Models\MuscleGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MuscleGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MuscleGroup::insert([
            [
                'muscle_group' => 'legs',
            ],
            [
                'muscle_group' => 'chest',
            ],
            [
                'muscle_group' => 'back',
            ],
            [
                'muscle_group' => 'arms',
            ],
            [
                'muscle_group' => 'press',
            ],
        ]);
    }
}
