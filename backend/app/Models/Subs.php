<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subs extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_subs';
    protected $fillable = [
        'PrivateSessionId','CourseId','StudentId','Status'
    ];
}

