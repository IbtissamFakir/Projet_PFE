<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FormationModule;
class Note extends Model
{
    use HasFactory;

    public function typeEvaluation()
    {
        return $this->belongsTo(TypeEvaluation::class ,'typeEvaluation_id');
    }

    public function formationModule()
    {
        return $this->belongsTo(FormationModule::class, 'formationModule_id');
    }

    public function stgFormateur()
    {
        return $this->belongsTo(StgFormateur::class, 'idStgFormateur');
    }
}
