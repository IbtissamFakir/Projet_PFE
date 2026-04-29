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
    'dateDeNaissance', 
    'lieuDeNaissance', 
    'numTel', 
    'dateInterruption', 
    'dateInscription', 
    'statut',
    'formation_id'
    ];     

    public function formation()
    {
        return $this->belongsTo(Formation::class, 'formation_id');
    }

    public function formateurs()
    {
        return $this->belongsToMany(User::class, 'stg_formateurs', 'stg_id', 'formateur_id');
    }
}


