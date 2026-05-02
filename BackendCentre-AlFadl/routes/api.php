<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RecupererDonnees;
use App\Http\Controllers\LoginController;

<<<<<<< HEAD




Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/admin/create-formateur', [AdminController::class, 'store']);
    Route::get('/admin/get-branches', [RecupererDonnees::class, 'getBranches']);
    Route::get('/admin/get-modules', [RecupererDonnees::class, 'getModules']);
    Route::get('/admin/get-formateurs', [RecupererDonnees::class, 'getFormateurs']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::Delete('/admin/supprimer-formateur/{id}', [AdminController::class, 'destroy']);
});
=======
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SortieController;

/*
|--------------------------------------------------------------------------
| API Routes - Projet Centre Al Fadl
|--------------------------------------------------------------------------
*/

// --- ROUTES POUR LA TOPBAR ET LE PROFIL ---
// Cette route est INDISPENSABLE pour corriger l'erreur 404 de la Topbar
Route::get('/profil-formateur', [NoteController::class, 'getProfilFormateur']);

// --- ROUTES POUR LES FORMATIONS ET STAGIAIRES ---
// Une seule route suffit pour récupérer les branches
Route::get('/formations', [NoteController::class, 'getBranches']);
Route::get('/stagiaires-par-branche/{id}', [NoteController::class, 'getStagiairesParBranche']);

// --- ROUTES POUR LES NOTES ---
Route::get('/tableau-notes', [NoteController::class, 'getTableauNotes']);
Route::post('/notes/bulk-store', [NoteController::class, 'bulkStore']);

// --- ROUTES POUR LES SORTIES ---
Route::get('/sorties', [SortieController::class, 'index']);
Route::post('/sorties/store', [SortieController::class, 'store']);
Route::delete('/sorties/delete/{id}', [SortieController::class, 'destroy']);
>>>>>>> Formateur
