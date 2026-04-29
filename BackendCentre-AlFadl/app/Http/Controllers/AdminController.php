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
                'formation_id' => $formation->id,
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
            'numTel' => [
                'required',
                'regex:/^(06|07)[0-9]{8}$/'
            ],
            'dateInterruption' => 'nullable|date',
            'formation_id' => 'required|exists:formations,id',
        ]);

        $formation = Formation::findOrFail($request->formation_id);
        $nbStagiairesValides = $formation->stagiaires()->where('statut', 'validé')->count();

        $statut = $nbStagiairesValides >= 20 ? 'en attente' : 'validé';

        $stagiaire = Stagiaire::create([
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
        return response()->json($stagiaire);
    }

    public function getFormationsSelect()
    {
        $formations = Formation::all();
        return response()->json($formations);
    }

    public function getStagiairesFormations($formation_id)
    {

        $stagiaires = Stagiaire::with('formation')
            ->where('formation_id', $formation_id)
            ->get();

        return response()->json($stagiaires);
    }
    public function destroy(Stagiaire $stagiaire)
    {
        $formationId = $stagiaire->formation_id;
        $statutSupprime = $stagiaire->statut;

        $stagiaire->delete();

        if ($statutSupprime === 'validé') {

            $countValides = Stagiaire::where('formation_id', $formationId)
                ->where('statut', 'validé')
                ->count();

            $placesRestantes = 20 - $countValides;

            if ($placesRestantes > 0) {

                $stagiairesAValider = Stagiaire::where('formation_id', $formationId)
                    ->where('statut', 'en attente')
                    ->orderBy('created_at', 'asc')
                    ->take($placesRestantes)
                    ->get();

                foreach ($stagiairesAValider as $s) {
                    $s->update(['statut' => 'validé']);
                }
            }
        }

        return response()->json([
            'message' => 'Stagiaire supprimé et mise à jour automatique effectuée'
        ]);
    }
public function update(Request $request, Stagiaire $stagiaire)
{
    $request->validate([
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'dateDeNaissance' => [
            'required',
            'date',
            function ($attribute, $value, $fail) {
                $age = \Carbon\Carbon::parse($value)->age;
                if ($age < 15 || $age > 20) {
                    $fail('L’âge doit être entre 15 et 20 ans.');
                }
            }
        ],
        'lieuDeNaissance' => 'required|string',
        'numTel' => [
            'required',
            'regex:/^(06|07)[0-9]{8}$/'
        ],
        // AJOUTEZ CES DEUX LIGNES POUR QUE LA BRANCHE SOIT ENREGISTRÉE
        'formation_id' => 'required|exists:formations,id',
        'dateInterruption' => 'nullable|date',
    ], [
        'numTel.required' => 'Le numéro de téléphone est obligatoire.',
        'numTel.regex' => 'Le numéro doit commencer par 06 ou 07 et contenir 10 chiffres.',
    ]);

    // Mise à jour de TOUS les champs envoyés par le formulaire
    $stagiaire->update([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'dateDeNaissance' => $request->dateDeNaissance,
        'lieuDeNaissance' => $request->lieuDeNaissance,
        'numTel' => $request->numTel,
        'formation_id' => $request->formation_id, // Important !
        'dateInterruption' => $request->dateInterruption, // Important !
    ]);

    // ✅ IMPORTANT : Renvoyer l'objet stagiaire DIRECTEMENT
    // Cela permet à React de faire { ...s, ...res.data } correctement
    return response()->json($stagiaire->refresh());
}
}
