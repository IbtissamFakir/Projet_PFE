<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\RecupererDonnees;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;




Route::post('/login', [LoginController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/admin/create-formateur', [AdminController::class, 'store']);
    Route::get('/admin/get-branches', [RecupererDonnees::class, 'getBranches']);
    Route::get('/admin/get-modules', [RecupererDonnees::class, 'getModules']);
    Route::get('/admin/get-formateurs', [RecupererDonnees::class, 'getFormateurs']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::delete('/admin/supprimer-formateur/{id}', [AdminController::class, 'destroy']);
});
Route::get('/formation',[AdminController::class, 'show']);
Route::get('/formation/sorties/{id}',[AdminController::class, 'index']);
Route::get('/formation/{id}/stagiaires',[AdminController::class,'getNotesStagiaires']);
Route::get('/releveNote/stagiaire/{id}',[AdminController::class,'getSeulReleve']);
Route::get('/releveNote/formation/{id}/stagiaires',[AdminController::class,'getToutReleve']);
Route::post('/notes-discipline', [AdminController::class, 'notesDiscipline']);
Route::get('/releve/pdf/formation/{id}', [AdminController::class, 'exportTousRelevesPdf']);
Route::get('/releve/pdf/stagiaire/{id}', [AdminController::class, 'exportSeulRelevePdf']);