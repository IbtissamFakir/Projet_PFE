<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\VilleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/admin/statistiques', [AdminController::class, 'getStatistiques']);

Route::get('/admin/formations', [AdminController::class, 'getFormations']);

Route::post('/admin/formations/stagiaires', [AdminController::class, 'storeStagiaire']);

Route::get('/admin/villes', [VilleController::class, 'index']);

Route::get('/admin/formationsSelect', [AdminController::class, 'getFormationsSelect']);

Route::get('/admin/stagiaires/{formation_id}', [AdminController::class, 'getStagiairesFormations']);
Route::delete('/admin/stagiaires/{stagiaire}', [AdminController::class, 'destroyStagiaire']);
Route::put('/admin/stagiaires/{stagiaire}', [AdminController::class, 'updateStagiaire']);