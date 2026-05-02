<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sortie extends Model
{
    protected $table = 'sorties';

    // Assure-toi que l'orthographe est EXACTEMENT celle-ci
    protected $fillable = [
        'dateSortie', 
        'lieuSortie', 
        'formateur_id'
    ];

    // Comme ta table n'a pas l'air d'avoir created_at/updated_at sur l'image
    public $timestamps = true; 
}