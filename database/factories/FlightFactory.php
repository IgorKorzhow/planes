<?php

namespace Database\Factories;

use App\Models\Plane;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $status = ['history', 'cancelled', 'upcoming'];
        return [
            'plane_id' => Plane::factory()->create()->id,
            'departure_city' => fake()->city,
            'arrival_city' => fake()->city,
            'departure_date_time' => fake()->dateTime,
            'arrival_date_time' => fake()->dateTime,
            'ticket_price_basic_place' => fake()->numberBetween(10, 500),
            'ticket_price_premium_place' => fake()->numberBetween(100, 1000),
            'status' => $status[fake()->numberBetween(0, 2)],
        ];
    }
}
