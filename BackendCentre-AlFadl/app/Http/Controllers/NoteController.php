<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\User;
use App\Models\TypeEvaluation;
use App\Models\Stagiaire;
use App\Models\Formation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    public function getProfilFormateur()
    {
        try {
            // Utilise l'utilisateur connecté ou le premier formateur trouvé pour le test
            $user = Auth::user() ?? User::whereIn('role', ['formateurBranche', 'formateurModule'])->first();
            
            if (!$user) {
                return response()->json(['error' => 'Non authentifié'], 401);
            }

            return response()->json([
                'nom' => $user->nomComplet,
                'role' => $user->role
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    public function getBranches()
    {
        try {
            // On récupère toutes les branches pour le menu déroulant
            $formations = Formation::all();
            return response()->json($formations, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

 
    public function getStagiairesParBranche($id)
    {
        try {
            $stagiaires = Stagiaire::where('formation_id', $id)
                ->with(['notes.typeEvaluation'])
                ->get()
                ->map(function($stg) {
                    $notesFormatted = [];
                    foreach ($stg->notes as $n) {
                        if ($n->typeEvaluation) {
                            $notesFormatted[strtoupper($n->typeEvaluation->type)] = $n->note;
                        }
                    }
                    return [
                        'id' => $stg->id,
                        'nomComplet' => strtoupper($stg->nom) . ' ' . ucfirst($stg->prenom),
                        'notesExistantes' => $notesFormatted
                    ];
                });

            return response()->json(['stagiaires' => $stagiaires], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getTableauNotes()
    {
        try {
            $user = Auth::user() ?? User::whereIn('role', ['formateurBranche', 'formateurModule'])->first();
            if (!$user) return response()->json(['error' => 'Non authentifié'], 401);

            $formation = DB::table('formations')->where('id', $user->formation_id)->first();

            $stagiaires = Stagiaire::where('formation_id', $user->formation_id)
                ->with(['notes.typeEvaluation'])
                ->get()
                ->map(function($stg) {
                    $notesFormatted = [];
                    foreach ($stg->notes as $n) {
                        if ($n->typeEvaluation) {
                            $notesFormatted[strtoupper($n->typeEvaluation->type)] = $n->note;
                        }
                    }
                    return [
                        'id' => $stg->id,
                        'nomComplet' => strtoupper($stg->nom) . ' ' . ucfirst($stg->prenom),
                        'notesExistantes' => $notesFormatted
                    ];
                });

            return response()->json([
                'userName' => $user->nomComplet,
                'nomBranche' => $formation ? $formation->intitule : 'Inconnue',
                'stagiaires' => $stagiaires
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function bulkStore(Request $request)
    {
        $user = Auth::user() ?? User::whereIn('role', ['formateurBranche', 'formateurModule'])->first();
        $notesData = $request->input('notes');

        try {
            DB::beginTransaction();
            $allTypes = TypeEvaluation::all()->mapWithKeys(function ($item) {
                return [strtoupper($item->type) => $item->id];
            });

            foreach ($notesData as $item) {
                $typeCode = strtoupper($item['type_code']);
                $typeId = $allTypes->get($typeCode);
                $noteValue = $item['note'];

                if ($typeId && $noteValue !== "" && $noteValue !== null) {
                    Note::updateOrCreate(
                        [
                            'stagiaire_id'      => $item['stagiaire_id'],
                            'typeEvaluation_id'  => $typeId,
                            'formation_id'       => $user->formation_id,
                            'formationModule_id' => ($user->role === 'formateurModule') ? $user->formationModule_id : null,
                        ],
                        ['note' => $noteValue]
                    );
                }
            }
            DB::commit();
            return response()->json(['message' => 'Toutes les notes ont été mises à jour !']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}