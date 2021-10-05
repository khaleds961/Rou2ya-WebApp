<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateSession extends Model
{
    use HasFactory; 
    public $table = 'privateSessions'; 
    protected $fillable= [
        'StudentId','UserId','Type','Riwaya','Surah','TimeFrom','TimeTo','PageFrom',
        'PageTo','VerseFrom','VerseTo','Note','Date'
    ];
}

