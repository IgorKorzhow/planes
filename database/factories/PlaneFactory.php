<?php

namespace Database\Factories;

use App\Models\PlaneFirm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plane>
 */
class PlaneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model' => fake()->text(50),
            'creation_date' => fake()->date(),
            'serial_number' => fake()->randomNumber(),
            'basic_seats_number' => fake()->randomNumber(3),
            'premium_seats_number' => fake()->randomNumber(2),
            'firm_id' => PlaneFirm::factory()->create()->id
        ];
    }
}
