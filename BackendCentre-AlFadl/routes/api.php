<?php

use App\Http\Controllers\AdminController;
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
Route::get('/formation',[AdminController::class, 'show']);
Route::get('/formation/sorties/{id}',[AdminController::class, 'index']);
Route::get('/formation/{id}/stagiaires',[AdminController::class,'getNotesStagiaires']);
Route::get('/releveNote/stagiaire/{id}',[AdminController::class,'getSeulReleve']);
Route::get('/releveNote/formation/{id}/stagiaires',[AdminController::class,'getToutReleve']);
Route::post('/notes-discipline', [AdminController::class, 'notesDiscipline']);
Route::get('/releve/pdf/formation/{id}', [AdminController::class, 'exportTousRelevesPdf']);
Route::get('/releve/pdf/stagiaire/{id}', [AdminController::class, 'exportSeulRelevePdf']);