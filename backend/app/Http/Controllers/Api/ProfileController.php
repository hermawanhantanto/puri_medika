<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use App\Models\Rekammedis;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function pendaftaran ($id) {
        $user = User::find($id);
        if(is_null($user)) {
            return response()->json([
                'message' => 'User Not Found'
            ], 404);
        }

        $pendaftaran = Pendaftaran::where('user_id', $id)->get()->map(function($item) {
            $item->dokter;
            $item->ruang;
            return $item;
        });

        
        if(is_null($pendaftaran)) {
            return response()->json([
                'message' => 'Pendaftaran Not Found'
            ], 404);
        }

        return response()->json([
            'message' => 'Pendaftaran Berhasil Ditemukan',
            'data' => $pendaftaran,
        ], 200);
    }

    public function rekammedis ($id) {
        $user = User::find($id);
        if(is_null($user)) {
            return response()->json([
                'message' => 'User Not Found'
            ], 404);
        }

        $query = Rekammedis::join('pendaftarans', 'rekammedis.pendaftaran_id', '=', 'pendaftarans.id')
        ->join('users', 'pendaftarans.user_id', '=', 'users.id')
        ->select('rekammedis.*', 'users.nama as nama_pasien', 'users.jenis_kelamin', 'users.nomor_identitas')
        ->where('users.id', $id)->get();

        
        if(is_null($query)) {
            return response()->json([
                'message' => 'RekamMedis Not Found'
            ], 404);
        }

        return response()->json([
            'message' => 'RekamMedis Berhasil Ditemukan',
            'data' => $query,
        ], 200);
    }
}


