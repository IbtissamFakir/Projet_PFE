<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

    
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        // Exemple d’appel à un seeder spécifique
        $this->call([
            FormationSeeder::class,
        ]);

        // 1️⃣ Tables indépendantes
        $formations = \App\Models\Formation::all();
        $modules    = \App\Models\Module::factory(10)->create();
        $typesEval  = \App\Models\TypeEvaluation::factory(3)->create();
        $users      = \App\Models\User::factory(10)->create();

        // 2️⃣ Stagiaires liés à chaque formation
        $stagiaires = collect();
        foreach ($formations as $formation) {
            $stagiairesPerFormation = \App\Models\Stagiaire::factory(25)->create([
                'formation_id' => $formation->id,
            ]);
            $stagiaires = $stagiaires->concat($stagiairesPerFormation);
        }

        // 3️⃣ Table pivot formation ↔ modules
        foreach ($formations as $formation) {
            if ($modules->count() > 0) {
                $formation->modules()->attach(
                    $modules->random(3)->pluck('id')->toArray()
                );
            }
        }

        // 4️⃣ Table pivot stagiaires ↔ formateurs
        foreach ($stagiaires as $stagiaire) {
            $formateur = \App\Models\User::where('role', 'formateur')->inRandomOrder()->first();
            if ($formateur) {
                $stagiaire->formateurs()->attach($formateur->id);
            }
        }

        // 5️⃣ Notes liées aux stagiaires, formationModules et type d’évaluation
        $formationModule = \App\Models\FormationModule::inRandomOrder()->first();
        if ($formationModule && $stagiaires->count() > 0 && $typesEval->count() > 0) {
            \App\Models\Note::factory(50)->create([
                'stagiaire_id'       => $stagiaires->random()->id,
                'formationModule_id' => $formationModule->id,
                'typeEvaluation_id'  => $typesEval->random()->id,
                'formation_id'       => $formations->random()->id,
            ]);
        }

        // 6️⃣ Sorties liées aux formateurs (⚠️ pas de stagiaire_id si absent de ta migration)
        $formateurBranche = \App\Models\User::where('role', 'formateurBranche')->inRandomOrder()->first();
        if ($formateurBranche) {
            \App\Models\Sortie::factory(10)->create([
                'formateur_id' => $formateurBranche->id,
            ]);
        }
    }
}
