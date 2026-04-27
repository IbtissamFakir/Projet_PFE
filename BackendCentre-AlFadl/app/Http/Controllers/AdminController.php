<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Stagiaire;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getStatistiques()
    {
        $stagiaires = Stagiaire::count();
        $formateurs = User::whereIn('role', ['formateurBranche', 'formateurModule'])->count();
        $formations = Formation::count();
        return response()->json([
            'stagiaires' => $stagiaires,
            'formateurs' => $formateurs,
            'formations' => $formations,
        ]);
    }
    public function getFormations()
    {
        $formations = Formation::with(['formateur', 'stagiaires'])->get();

        $resultat = $formations->map(function ($formation) {
            return [
                'formation' => $formation->intitule,
                'formateur' => $formation->formateur ? $formation->formateur->nomComplet : 'Aucun formateur',
                'nombreStagaires' => $formation->stagiaires->count(),
            ];
        });

        return response()->json($resultat);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'dateDeNaissance' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $age = Carbon::parse($value)->age;
                    if ($age < 15 || $age > 20) {
                        $fail('L âge doit être entre 15 et 20 ans.');
                    }
                }
            ],
            'lieuDeNaissance' => 'required|string',
            'numTel' => 'required|string',
            'dateInterruption' => 'nullable|date',
            'formation_id' => 'required|exists:formations,id',
        ]);

        $formation = Formation::findOrFail($request->formation_id);
        $nbStagiairesValides = $formation->stagiaires()->where('statut', 'validé')->count();

        $statut = $nbStagiairesValides >= 20 ? 'en attente' : 'validé';

       $stagiaire= Stagiaire::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'dateDeNaissance' => $request->dateDeNaissance,
            'lieuDeNaissance' => $request->lieuDeNaissance,
            'numTel' => $request->numTel,
            'dateInterruption' => $request->dateInterruption,
            'dateInscription' => Carbon::now(),
            'formation_id' => $request->formation_id,
            'statut' => $statut,
        ]);
        return response()->json($stagiaire, 201);
    }

    public function getFormationsSelect(){
        $formations =Formation::all();
        return response()->json($formations);
    }
}
