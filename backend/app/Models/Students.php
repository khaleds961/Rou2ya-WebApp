<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_stud';
    protected $fillable = [
        'FirstName','LastName','SchoolName','Note','Code','Phone','ClassId'
    ];
}


