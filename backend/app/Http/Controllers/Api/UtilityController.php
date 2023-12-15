<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\Pendaftaran;
use App\Models\Rekammedis;
use App\Models\Ruang;
use App\Models\User;
use Illuminate\Http\Request;

class UtilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getCountPasien()
    {
        //
        $countPasien = User::where('role', 'USER')->count();
        return response()->json([
            'status' => 'success',
            'data' => $countPasien
        ]);
    }
    public function getCountDokter()
    {
        //
       $countDokter = Dokter::count();
        return response()->json([
            'status' => 'success',
            'data' => $countDokter
        ]);
    }
    public function getCountRuang()
    {
        //
       $countRuang = Ruang::count();
        return response()->json([
            'status' => 'success',
            'data' => $countRuang
        ]);
    }
    public function getCountPendaftaran()
    {
        //
       $countPendaftaran = Pendaftaran::count();
        return response()->json([
            'status' => 'success',
            'data' => $countPendaftaran
        ]);
    }
    public function getCountRekamMedis()
    {
        //
       $countRekamMedis = Rekammedis::count();
        return response()->json([
            'status' => 'success',
            'data' => $countRekamMedis
        ]);
    }

    public function getRecentPasien()
    {
        //
       $recentPasien = User::where('role', 'USER')->orderBy('created_at', 'desc')->take(5)->get();
        return response()->json([
            'status' => 'success',
            'data' => $recentPasien
        ]);
    }
}
