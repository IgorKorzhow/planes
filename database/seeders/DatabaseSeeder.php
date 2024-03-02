<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Flight;
use App\Models\Plane;
use App\Models\PlaneFirm;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Flight::factory()->count(10)->create();
        PlaneFirm::factory()->count(10)->create();
        Plane::factory()->count(10)->create();

        // \App\Models\UserResource::factory(10)->create();

        // \App\Models\UserResource::factory()->create([
        //     'name' => 'Test UserResource',
        //     'email' => 'test@example.com',
        // ]);
    }
}
