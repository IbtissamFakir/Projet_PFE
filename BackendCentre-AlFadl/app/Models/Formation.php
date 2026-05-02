<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;

    // Indique à Laravel que la table s'appelle bien "formations"
    protected $table = 'formations';

    public $timestamps = false;

    protected $fillable = ['intitule', 'masseHoraire'];

   
}