<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Formation;
use App\Models\Module;
use App\Models\Stagiaire;
use App\Models\TypeEvaluation;
use App\Models\FormationModule;
use App\Models\StgFormateur;
use App\Models\Sortie;
use App\Models\Note;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Formations
        $formations = [
            ['intitule' => 'Développement Web Full Stack', 'masseHoraire' => 480],
            ['intitule' => 'Développement Mobile', 'masseHoraire' => 400],
            ['intitule' => 'Design Graphique', 'masseHoraire' => 360],
            ['intitule' => 'Marketing Digital', 'masseHoraire' => 320],
            ['intitule' => 'Comptabilité et Gestion', 'masseHoraire' => 280],
        ];

        $formationIds = [];
        foreach ($formations as $formation) {
            $formationIds[] = Formation::create($formation)->id;
        }

        // 2. Modules
        $modules = [
            ['intitule' => 'HTML/CSS', 'masseHoraire' => 60],
            ['intitule' => 'JavaScript', 'masseHoraire' => 80],
            ['intitule' => 'PHP/MySQL', 'masseHoraire' => 100],
            ['intitule' => 'Laravel', 'masseHoraire' => 80],
            ['intitule' => 'React', 'masseHoraire' => 80],
            ['intitule' => 'Node.js', 'masseHoraire' => 60],
            ['intitule' => 'Flutter', 'masseHoraire' => 100],
            ['intitule' => 'Swift', 'masseHoraire' => 80],
            ['intitule' => 'Photoshop', 'masseHoraire' => 60],
            ['intitule' => 'Illustrator', 'masseHoraire' => 60],
            ['intitule' => 'SEO', 'masseHoraire' => 40],
            ['intitule' => 'Réseaux Sociaux', 'masseHoraire' => 60],
            ['intitule' => 'Comptabilité', 'masseHoraire' => 80],
            ['intitule' => 'Gestion de Projet', 'masseHoraire' => 60],
        ];

        $moduleIds = [];
        foreach ($modules as $module) {
            $moduleIds[] = Module::create($module)->id;
        }

        // 3. Type Évaluations
        $typeEvaluations = [
            ['type' => 'Examen'],
            ['type' => 'Devoir'],
            ['type' => 'Projet'],
            ['type' => 'Participation'],
        ];

        $typeEvalIds = [];
        foreach ($typeEvaluations as $typeEval) {
            $typeEvalIds[] = TypeEvaluation::create($typeEval)->id;
        }

        // 4. Users (Formateurs)
        $formateurs = [
            [
                'nomComplet' => 'Mohamed Ali',
                'email_genere' => 'mohamed.ali@centrealfadl.dz',
                'email_personnel' => 'mohamed.ali@gmail.com',
                'password' => Hash::make('password123'),
                'numTel' => '0550123456',
                'role' => 'formateur',
                'formation_id' => $formationIds[0],
            ],
            [
                'nomComplet' => 'Fatima Zohra',
                'email_genere' => 'fatima.zohra@centrealfadl.dz',
                'email_personnel' => 'fatima.zohra@gmail.com',
                'password' => Hash::make('password123'),
                'numTel' => '0551234567',
                'role' => 'formateur',
                'formation_id' => $formationIds[0],
            ],
            [
                'nomComplet' => 'Youssef Benali',
                'email_genere' => 'youssef.benali@centrealfadl.dz',
                'email_personnel' => 'youssef.benali@gmail.com',
                'password' => Hash::make('password123'),
                'numTel' => '0552345678',
                'role' => 'formateur',
                'formation_id' => $formationIds[1],
            ],
            [
                'nomComplet' => 'Amina Boudiaf',
                'email_genere' => 'amina.boudiaf@centrealfadl.dz',
                'email_personnel' => 'amina.boudiaf@gmail.com',
                'password' => Hash::make('password123'),
                'numTel' => '0553456789',
                'role' => 'formateur',
                'formation_id' => $formationIds[2],
            ],
            [
                'nomComplet' => 'Karim Mansouri',
                'email_genere' => 'karim.mansouri@centrealfadl.dz',
                'email_personnel' => 'karim.mansouri@gmail.com',
                'password' => Hash::make('password123'),
                'numTel' => '0554567890',
                'role' => 'formateur',
                'formation_id' => $formationIds[3],
            ],
        ];

        $formateurIds = [];
        foreach ($formateurs as $formateur) {
            $formateurIds[] = User::create($formateur)->id;
        }

        // 5. Stagiaires
        $stagiaires = [
            [
                'nom' => 'Bensalem',
                'prenom' => 'Amir',
                'dateDeNaissance' => '2002-05-15',
                'lieuDeNaissance' => 'Alger',
                'numTel' => '0661122334',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 15.5,
                'noteDiscipline' => 18.0,
                'formation_id' => $formationIds[0],
            ],
            [
                'nom' => 'Kermiche',
                'prenom' => 'Lina',
                'dateDeNaissance' => '2003-02-20',
                'lieuDeNaissance' => 'Oran',
                'numTel' => '0662233445',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 16.2,
                'noteDiscipline' => 17.5,
                'formation_id' => $formationIds[0],
            ],
            [
                'nom' => 'Haddad',
                'prenom' => 'Yacine',
                'dateDeNaissance' => '2001-08-10',
                'lieuDeNaissance' => 'Constantine',
                'numTel' => '0663344556',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 14.8,
                'noteDiscipline' => 16.0,
                'formation_id' => $formationIds[0],
            ],
            [
                'nom' => 'Bouzid',
                'prenom' => 'Nadia',
                'dateDeNaissance' => '2002-11-25',
                'lieuDeNaissance' => 'Blida',
                'numTel' => '0664455667',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 17.0,
                'noteDiscipline' => 19.0,
                'formation_id' => $formationIds[1],
            ],
            [
                'nom' => 'Mekki',
                'prenom' => 'Rami',
                'dateDeNaissance' => '2003-04-08',
                'lieuDeNaissance' => 'Annaba',
                'numTel' => '0665566778',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 15.0,
                'noteDiscipline' => 17.0,
                'formation_id' => $formationIds[1],
            ],
            [
                'nom' => 'Cherif',
                'prenom' => 'Sara',
                'dateDeNaissance' => '2002-07-12',
                'lieuDeNaissance' => 'Setif',
                'numTel' => '0666677889',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 16.5,
                'noteDiscipline' => 18.5,
                'formation_id' => $formationIds[2],
            ],
            [
                'nom' => 'Amrani',
                'prenom' => 'Omar',
                'dateDeNaissance' => '2001-12-30',
                'lieuDeNaissance' => 'Tizi Ouzou',
                'numTel' => '0667788990',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 14.2,
                'noteDiscipline' => 15.5,
                'formation_id' => $formationIds[3],
            ],
            [
                'nom' => 'Belhadj',
                'prenom' => 'Hakima',
                'dateDeNaissance' => '2002-03-18',
                'lieuDeNaissance' => 'Bejaia',
                'numTel' => '0668899001',
                'dateInterruption' => '2025-12-20',
                'statut' => 'actif',
                'dateInscription' => '2025-09-01',
                'moyenneGeneral' => 15.8,
                'noteDiscipline' => 17.0,
                'formation_id' => $formationIds[4],
            ],
        ];

        $stagiaireIds = [];
        foreach ($stagiaires as $stagiaire) {
            $stagiaireIds[] = Stagiaire::create($stagiaire)->id;
        }

        // 6. Formation Modules (Pivot)
        $formationModules = [
            // Formation 1: Développement Web Full Stack
            ['formation_id' => $formationIds[0], 'module_id' => $moduleIds[0]], // HTML/CSS
            ['formation_id' => $formationIds[0], 'module_id' => $moduleIds[1]], // JavaScript
            ['formation_id' => $formationIds[0], 'module_id' => $moduleIds[2]], // PHP/MySQL
            ['formation_id' => $formationIds[0], 'module_id' => $moduleIds[3]], // Laravel
            ['formation_id' => $formationIds[0], 'module_id' => $moduleIds[4]], // React
            // Formation 2: Développement Mobile
            ['formation_id' => $formationIds[1], 'module_id' => $moduleIds[0]], // HTML/CSS
            ['formation_id' => $formationIds[1], 'module_id' => $moduleIds[1]], // JavaScript
            ['formation_id' => $formationIds[1], 'module_id' => $moduleIds[5]], // Node.js
            ['formation_id' => $formationIds[1], 'module_id' => $moduleIds[6]], // Flutter
            ['formation_id' => $formationIds[1], 'module_id' => $moduleIds[7]], // Swift
            // Formation 3: Design Graphique
            ['formation_id' => $formationIds[2], 'module_id' => $moduleIds[8]], // Photoshop
            ['formation_id' => $formationIds[2], 'module_id' => $moduleIds[9]], // Illustrator
            ['formation_id' => $formationIds[2], 'module_id' => $moduleIds[0]], // HTML/CSS
            // Formation 4: Marketing Digital
            ['formation_id' => $formationIds[3], 'module_id' => $moduleIds[10]], // SEO
            ['formation_id' => $formationIds[3], 'module_id' => $moduleIds[11]], // Réseaux Sociaux
            ['formation_id' => $formationIds[3], 'module_id' => $moduleIds[13]], // Gestion de Projet
            // Formation 5: Comptabilité et Gestion
            ['formation_id' => $formationIds[4], 'module_id' => $moduleIds[12]], // Comptabilité
            ['formation_id' => $formationIds[4], 'module_id' => $moduleIds[13]], // Gestion de Projet
        ];

        $formationModuleIds = [];
        foreach ($formationModules as $fm) {
            $formationModuleIds[] = FormationModule::create($fm)->id;
        }

        // 7. Stagiaire-Formateurs (Pivot)
        $stgFormateurs = [
            ['stg_id' => $stagiaireIds[0], 'formateur_id' => $formateurIds[0]],
            ['stg_id' => $stagiaireIds[1], 'formateur_id' => $formateurIds[0]],
            ['stg_id' => $stagiaireIds[2], 'formateur_id' => $formateurIds[1]],
            ['stg_id' => $stagiaireIds[3], 'formateur_id' => $formateurIds[2]],
            ['stg_id' => $stagiaireIds[4], 'formateur_id' => $formateurIds[2]],
            ['stg_id' => $stagiaireIds[5], 'formateur_id' => $formateurIds[3]],
            ['stg_id' => $stagiaireIds[6], 'formateur_id' => $formateurIds[4]],
            ['stg_id' => $stagiaireIds[7], 'formateur_id' => $formateurIds[4]],
        ];

        foreach ($stgFormateurs as $sf) {
            StgFormateur::create($sf);
        }

        // 8. Sorties
        $sorties = [
            [
                'dateSortie' => '2025-10-15',
                'lieuSortie' => 'Musée National du Sahara',
                'formateur_id' => $formateurIds[0],
            ],
            [
                'dateSortie' => '2025-11-20',
                'lieuSortie' => 'Parc National du Hoggar',
                'formateur_id' => $formateurIds[1],
            ],
            [
                'dateSortie' => '2025-12-05',
                'lieuSortie' => 'Université d\'Alger',
                'formateur_id' => $formateurIds[2],
            ],
            [
                'dateSortie' => '2026-01-10',
                'lieuSortie' => 'Centre Culturel Français',
                'formateur_id' => $formateurIds[3],
            ],
        ];

        foreach ($sorties as $sortie) {
            Sortie::create($sortie);
        }

        // 9. Notes
        $notes = [
            // Stagiaire 1 - Formation 1
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[0],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[0],
                'note' => 16.5,
            ],
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[1],
                'typeEvaluation_id' => $typeEvalIds[1],
                'stagiaire_id' => $stagiaireIds[0],
                'note' => 15.0,
            ],
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[2],
                'typeEvaluation_id' => $typeEvalIds[2],
                'stagiaire_id' => $stagiaireIds[0],
                'note' => 14.0,
            ],
            // Stagiaire 2 - Formation 1
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[0],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[1],
                'note' => 17.0,
            ],
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[1],
                'typeEvaluation_id' => $typeEvalIds[1],
                'stagiaire_id' => $stagiaireIds[1],
                'note' => 16.5,
            ],
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[2],
                'typeEvaluation_id' => $typeEvalIds[2],
                'stagiaire_id' => $stagiaireIds[1],
                'note' => 15.5,
            ],
            // Stagiaire 3 - Formation 1
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[0],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[2],
                'note' => 14.0,
            ],
            [
                'formation_id' => $formationIds[0],
                'formationModule_id' => $formationModuleIds[1],
                'typeEvaluation_id' => $typeEvalIds[1],
                'stagiaire_id' => $stagiaireIds[2],
                'note' => 15.5,
            ],
            // Stagiaire 4 - Formation 2
            [
                'formation_id' => $formationIds[1],
                'formationModule_id' => $formationModuleIds[6],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[3],
                'note' => 18.0,
            ],
            [
                'formation_id' => $formationIds[1],
                'formationModule_id' => $formationModuleIds[7],
                'typeEvaluation_id' => $typeEvalIds[2],
                'stagiaire_id' => $stagiaireIds[3],
                'note' => 16.5,
            ],
            // Stagiaire 5 - Formation 2
            [
                'formation_id' => $formationIds[1],
                'formationModule_id' => $formationModuleIds[6],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[4],
                'note' => 15.0,
            ],
            [
                'formation_id' => $formationIds[1],
                'formationModule_id' => $formationModuleIds[7],
                'typeEvaluation_id' => $typeEvalIds[2],
                'stagiaire_id' => $stagiaireIds[4],
                'note' => 14.5,
            ],
            // Stagiaire 6 - Formation 3
            [
                'formation_id' => $formationIds[2],
                'formationModule_id' => $formationModuleIds[10],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[5],
                'note' => 17.5,
            ],
            [
                'formation_id' => $formationIds[2],
                'formationModule_id' => $formationModuleIds[11],
                'typeEvaluation_id' => $typeEvalIds[1],
                'stagiaire_id' => $stagiaireIds[5],
                'note' => 16.0,
            ],
            // Stagiaire 7 - Formation 4
            [
                'formation_id' => $formationIds[3],
                'formationModule_id' => $formationModuleIds[12],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[6],
                'note' => 14.5,
            ],
            [
                'formation_id' => $formationIds[3],
                'formationModule_id' => $formationModuleIds[13],
                'typeEvaluation_id' => $typeEvalIds[1],
                'stagiaire_id' => $stagiaireIds[6],
                'note' => 13.5,
            ],
            // Stagiaire 8 - Formation 5
            [
                'formation_id' => $formationIds[4],
                'formationModule_id' => $formationModuleIds[14],
                'typeEvaluation_id' => $typeEvalIds[0],
                'stagiaire_id' => $stagiaireIds[7],
                'note' => 16.0,
            ],
            [
                'formation_id' => $formationIds[4],
                'formationModule_id' => $formationModuleIds[15],
                'typeEvaluation_id' => $typeEvalIds[1],
                'stagiaire_id' => $stagiaireIds[7],
                'note' => 15.5,
            ],
        ];

        foreach ($notes as $note) {
            Note::create($note);
        }
    }
}
