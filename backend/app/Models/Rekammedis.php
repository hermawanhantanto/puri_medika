<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekammedis extends Model
{
    use HasFactory;
    protected $fillable = [
        'pendaftaran_id',
        'keluhan',
        'diagnosa',
        'tindakan',
        'keterangan'
    ];
    
    public function pendaftaran()
    {
        return $this->belongsTo(Pendaftaran::class);
    }
}
