<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    // Autorise Laravel à remplir ces colonnes lors du updateOrCreate
    protected $fillable = [
        'note',
        'stagiaire_id',
        'typeEvaluation_id',
        'formation_id',
        'formationModule_id' // Doit être nullable dans la DB pour les profs de branche
    ];

    /**
     * Relation avec le stagiaire.
     */
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class, 'stagiaire_id');
    }

    /**
     * Relation avec le type d'évaluation (TH1, PR1, etc.)
     */
    public function typeEvaluation()
    {
        return $this->belongsTo(TypeEvaluation::class, 'typeEvaluation_id');
    }

    /**
     * Relation avec la formation.
     */
    public function formation()
    {
        return $this->belongsTo(Formation::class, 'formation_id');
    }

    /**
     * Relation avec le module (optionnelle).
     */
    public function formationModule()
    {
        return $this->belongsTo(FormationModule::class, 'formationModule_id');
    }
}