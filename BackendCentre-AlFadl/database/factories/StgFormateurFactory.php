<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StgFormateur>
 */
class StgFormateurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
          return [
            'stg_id' => \App\Models\Stagiaire::factory(),
            'formateur_id' => \App\Models\User::factory(),
        ];
    }
}
