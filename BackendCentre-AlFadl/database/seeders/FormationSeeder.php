<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formation;

class FormationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $formations = [
            ['intitule' => 'coiffureHomme', 'masseHoraire' => 100],
            ['intitule' => 'coiffurefemme', 'masseHoraire' => 100],
            ['intitule' => 'Électricité du bâtiment', 'masseHoraire' => 150],
            ['intitule' => 'informatique', 'masseHoraire' => 200],
            ['intitule' => 'construction de balles', 'masseHoraire' => 120],
            ['intitule' => 'confection et couture', 'masseHoraire' => 180],
            ['intitule' => 'cuisine et patisserie', 'masseHoraire' => 160],
        ];

        foreach ($formations as $formation) {
            Formation::create($formation);
        }
    }
}