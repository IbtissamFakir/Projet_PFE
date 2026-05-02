<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'date_naissance',
        'formation_id'
    ];

    /**
     * Relation avec les notes.
     * Un stagiaire possède plusieurs notes.
     */
    public function notes()
    {
        return $this->hasMany(Note::class, 'stagiaire_id');
    }

    /**
     * Relation avec la formation.
     */
    public function formation()
    {
        return $this->belongsTo(Formation::class, 'formation_id');
    }
}