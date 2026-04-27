<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'formation_id' => \App\Models\Formation::factory(),
            'formationModule_id' => \App\Models\FormationModule::factory(),
            'typeEvaluation_id' => \App\Models\TypeEvaluation::factory(),
            'stagiaire_id' => \App\Models\Stagiaire::factory(),
            'note' => $this->faker->randomFloat(2, 0, 20),
        ];
    }
}
