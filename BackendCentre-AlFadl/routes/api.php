<?php

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