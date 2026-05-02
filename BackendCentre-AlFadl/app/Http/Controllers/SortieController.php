<?php

namespace App\Http\Controllers;

use App\Models\Sortie;
use Illuminate\Http\Request;

class SortieController extends Controller
{
    public function index() {
        // On récupère par date de création décroissante
        return response()->json(Sortie::orderBy('created_at', 'desc')->get(), 200);
    }

    public function store(Request $request) {
        try {
            $sortie = new Sortie();
            $sortie->lieuSortie = $request->lieuSortie;
            $sortie->dateSortie = $request->dateSortie;
            $sortie->formateur_id = 1; // ID de l'utilisateur créé dans ta table users
            $sortie->save();

            return response()->json($sortie, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id) {
        try {
            $sortie = Sortie::findOrFail($id);
            $sortie->delete();
            return response()->json(['message' => 'Supprimé avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression'], 500);
        }
    }
}