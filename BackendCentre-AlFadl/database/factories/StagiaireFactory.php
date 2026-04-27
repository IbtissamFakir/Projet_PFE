<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stagiaire>
 */
class StagiaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      return [
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'dateDeNaissance' => $this->faker->date(),
            'lieuDeNaissance' => $this->faker->city(),
            'numTel' => $this->faker->randomNumber(8),
            'dateInterruption' => $this->faker->date(),
            'statut' => $this->faker->randomElement(['actif','interrompu']),
            'dateInscription' => $this->faker->date(),
            'moyenneGeneral' => $this->faker->randomFloat(2, 0, 20),
            'noteDiscipline' => $this->faker->randomFloat(2, 0, 20),
            'formation_id' => \App\Models\Formation::factory(),
        ];
    }
}
