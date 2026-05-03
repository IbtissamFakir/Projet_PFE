<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Note;
use App\Models\Sortie;
use App\Models\Stagiaire;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
class AdminController extends Controller
{
    public function show()
    {
        $formations = Formation::all();
        return response()->json($formations);
    }

   public function index($id)
{    $sorties = Sortie::whereHas('formateur', function ($query) use ($id) {
        // On filtre les formateurs par l'id de la formation reçue
        $query->where('formation_id', $id);
    })
    ->with('formateur:id,nomComplet')
    ->get(); // exécute la requête pour récupérer les données
    return response()->json($sorties);
}


public function notesDiscipline(Request $request)
{
    $request->validate([
        'notes' => 'required|array',
    ]);

    try {
        foreach ($request->notes as $noteData) {
            $stagiaire = Stagiaire::find($noteData['stagiaire_id']);
            if ($stagiaire) {
                // On change UNIQUEMENT la note de discipline
                $stagiaire->noteDiscipline = $noteData['noteDiscipline'];
                $stagiaire->save();
            }
        }
        return response()->json(['message' => 'Note de discipline enregistrée'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
// Fonction pour calculer le relevé d'un stagiaire
private function calculerReleve($stagiaire)
{
    $examensTypes = ['ET1','EP1','ET2','EP2','ET3','EP3','ET4','EP4'];
    $modulesTypes = ['CC1','CC2','CC3','CC4'];
    $stage = 'stage';

    $notes = Note::with(['typeEvaluation', 'formationModule.module'])
        ->where('stagiaire_id', $stagiaire->id)
        ->get();

    // EXAMENS
    $examens = $notes->filter(fn($n) =>
        in_array($n->typeEvaluation->type ?? null, $examensTypes)
    );

    $moyenneBranche = $examens->count()
        ? $examens->sum(fn($n) => $n->note * 4) / ($examens->count() * 4)
        : 0;

    // MODULES
    $modules = $notes->filter(fn($n) =>
        in_array($n->typeEvaluation->type ?? null, $modulesTypes)
    );

    $moyennesParModule = $modules->groupBy('formationModule.module_id')
        ->map(function ($notesModule) {
            $module = $notesModule->first()->formationModule->module;

            $moyenne = $notesModule->count()
                ? $notesModule->sum('note') / $notesModule->count()
                : 0;

            return [
                'module_id' => $module->id ?? null,
                'module_nom' => $module->intitule ?? 'Module inconnu',
                'moyenneModule' => round($moyenne, 2),
            ];
        });

    // DISCIPLINE
    $noteDiscipline = $stagiaire->noteDiscipline ?? 0;

    // STAGE
    $noteStage = $notes->firstWhere('typeEvaluation.type', $stage);
    $valeurStage = $noteStage->note ?? 0;

    // GLOBAL
    $sumGlobal = $examens->sum('note') + $modules->sum('note') + $noteDiscipline;
    $coefGlobal = $examens->count() + $modules->count() + 1;

    $moyenneSansStage = $coefGlobal ? $sumGlobal / $coefGlobal : 0;

    $moyenneGenerale = ($moyenneSansStage * 0.75) + ($valeurStage * 0.25);
$anneeEnCours = ucfirst(Carbon::now()->locale('fr')->translatedFormat('F Y'));
    return [
        'stagiaire_id' => $stagiaire->id,
        'stagiaire' => $stagiaire->nom . ' ' . $stagiaire->prenom,
        'moyenneBranche' => round($moyenneBranche, 2),
        'moyennesParModule' => $moyennesParModule->values(),
        'noteStage' => $noteStage ? round($noteStage->note, 2) : null,
        'noteDiscipline' => $noteDiscipline,
        'moyenneGenerale' => round($moyenneGenerale, 2),
        'anneeEnCours' => $anneeEnCours,
    ];
}
// Récupérer les notes de tous les stagiaires d'une formation
public function getNotesStagiaires($id)
{
    $stagiaires = Stagiaire::where('formation_id', $id)->get();

    $result = [];

    foreach ($stagiaires as $stagiaire) {

        $data = $this->calculerReleve($stagiaire); // 👈 IMPORTANT

        $stagiaire->moyenneGeneral = $data['moyenneGenerale'];
        $stagiaire->save();

        $result[] = array_merge([
            'stagiaire_id' => $stagiaire->id,
            'stagiaire' =>$stagiaire->nom . ' ' . $stagiaire->prenom,
        ], $data);
    }

    return response()->json($result);
}
// Récupérer le relevé d'un seul stagiaire
public function getSeulReleve($id)
{
    $stagiaire = Stagiaire::findOrFail($id);

    $data = $this->calculerReleve($stagiaire);

    return response()->json([
        'stagiaire_id' => $stagiaire->id,
        'stagiaire' => $stagiaire->nom . ' ' . $stagiaire->prenom,
        ...$data
    ]);
}
// Récupérer les relevés de tous les stagiaires d'une formation
public function getToutReleve($id)
{
    $stagiaires = Stagiaire::where('formation_id', $id)->get();

    $result = [];

    foreach ($stagiaires as $stagiaire) {
        $data = $this->calculerReleve($stagiaire);
        $result[] = array_merge([
            'stagiaire_id' => $stagiaire->id,
            'stagiaire' => $stagiaire->nom . ' ' . $stagiaire->prenom,
        ], $data);
    }

    return response()->json($result);
}

// Exporter les relevés de tous les stagiaires d'une formation en PDF
public function exportTousRelevesPdf($formationId)
{
    $stagiaires = Stagiaire::where('formation_id', $formationId)->get();
 

    $result = [];

    foreach ($stagiaires as $stagiaire) {
        $result[] = [
            'stagiaire_id' => $stagiaire->id,
            'stagiaire' => $stagiaire,
            'data' => $this->calculerReleve($stagiaire)
        ];
    }

    $pdf = Pdf::loadView('imprimeReleveNotes', [
        'result' => $result,

    ]);

    $pdf->setPaper('A4', 'portrait');

    return $pdf->stream('releves_formation_'.$formationId.'.pdf');
}

// Exporter le relevé d'un seul stagiaire en PDF
public function exportSeulRelevePdf($id)
{
    $stagiaire = Stagiaire::findOrFail($id);

  
    $result = [
        [
            'stagiaire_id' => $stagiaire->id,
            'stagiaire' => $stagiaire,
            'data' => $this->calculerReleve($stagiaire)
        ]
    ];

    $pdf =Pdf::loadView('imprimeReleveNotes', [
        'result' => $result,
    ]);

    return $pdf->stream('releve_stagiaire_'.$id.'.pdf');
}

}
