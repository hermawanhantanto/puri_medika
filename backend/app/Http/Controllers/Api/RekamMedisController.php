<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use App\Models\Rekammedis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RekamMedisController extends Controller
{
    //
    public function index(Request $request){
        $perPage = $request->input('perPage', 10);
        $orderBy = $request->input('orderBy', 'created_at');
       

        $allowedSort = ['created_at', 'keluhan', 'diagnosa', 'tindakan', 'keterangan','nama_pasien', 'jenis_kelamin', 'nomor_identitas'];

        if(!in_array($orderBy, $allowedSort)){
            $orderBy = 'created_at';
        }

        $query = Rekammedis::orderBy($orderBy)
            ->join('pendaftarans', 'rekammedis.pendaftaran_id', '=', 'pendaftarans.id')
            ->join('users', 'pendaftarans.user_id', '=', 'users.id')
            ->select('rekammedis.*', 'users.nama as nama_pasien', 'users.jenis_kelamin', 'users.nomor_identitas');

        if($request->has('jenis_kelamin')){
            if($request->input('jenis_kelamin') == 'L' || $request->input('jenis_kelamin') == 'P'){
                $query->where('users.jenis_kelamin', $request->input('jenis_kelamin'));
            }
        }

        $count = $query->count();

        $pendaftaran = $query->paginate($perPage);

        return response()->json([
            'message' => 'Berhasil menampilkan data rekam medis',
            'data' => $pendaftaran,
            'total' => $count
        ], 200);
    }

    public function store(Request $request){
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'pendaftaran_id' => 'required',
            'keluhan' => 'required|min:5|max:255',
            'diagnosa' => 'required|min:5|max:255',
            'tindakan' => 'required|min:5|max:255',
            'keterangan' => 'required|min:10|max:255'
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Gagal menambahkan data rekam medis',
                'error' => $validate->errors()
            ],400);
        }

        $pendaftaran = Pendaftaran::find($storeData['pendaftaran_id']);
        if(is_null($pendaftaran)){
            return response()->json([
                'message' => 'Data pendaftaran tidak ditemukan',
                'data' => null
            ],404);
        }

        if($pendaftaran->status == 'pending'){
            return response()->json([
                'message' => 'Pasien belum melakukan pemeriksaan',
                'data' => null
            ],400);
        }

        $unique = Rekammedis::where('pendaftaran_id', $storeData['pendaftaran_id'])->first();
        if(!is_null($unique)){
            return response()->json([
                'message' => 'Pasien sudah memiliki rekam medis',
                'data' => null
            ],400);
        }

        $rekammedis = Rekammedis::create($storeData);
        $pendaftaran->update([
            'status' => 'selesai'
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan data rekam medis',
            'data' => $rekammedis
        ],201);
    }

    public function show(string $id){
        $rekammedis = Rekammedis::find($id);
        if(is_null($rekammedis)){
            return response()->json([
                'message' => 'Data rekam medis tidak ditemukan',
                'data' => null
            ],404);
        }
        return response()->json([
            'message' => 'Berhasil menampilkan data rekam medis',
            'data' => $rekammedis
        ],200);
    }

    public function update(Request $request, string $id){
        $rekammedis = Rekammedis::find($id);
        if(is_null($rekammedis)){
            return response()->json([
                'message' => 'Data rekam medis tidak ditemukan',
                'data' => null
            ],404);
        }
        $updateData = $request->all();

        $validate = Validator::make($updateData,[
            'pendaftaran_id' => 'required',
            'keluhan' => 'required|min:5|max:255',
            'diagnosa' => 'required|min:5|max:255',
            'tindakan' => 'required|min:5|max:255',
            'keterangan' => 'required|min:10|max:255'
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Gagal mengubah data rekam medis',
                'error' => $validate->errors()
            ],400);
        }

        $pendaftaran = Pendaftaran::find($updateData['pendaftaran_id']);
        if(is_null($pendaftaran)){
            return response()->json([
                'message' => 'Data pendaftaran tidak ditemukan',
                'data' => null
            ],404);
        }

        if($pendaftaran->status == 'pending'){
            return response()->json([
                'message' => 'Pasien belum melakukan pemeriksaan',
                'data' => null
            ],400);
        }

        $unique = Rekammedis::where('pendaftaran_id', $updateData['pendaftaran_id'])->first();
        if(!is_null($unique)){
            return response()->json([
                'message' => 'Pasien sudah memiliki rekam medis',
                'data' => null
            ],400);
        }

        $rekammedis->update($updateData);
        $pendaftaran->update([
            'status' => 'selesai'
        ]);

        return response()->json([
            'message' => 'Berhasil mengubah data rekam medis',
            'data' => $rekammedis
        ],200);
    }

    public function destroy(string $id){
        $rekammedis = Rekammedis::find($id);
        if(is_null($rekammedis)){
            return response()->json([
                'message' => 'Data rekam medis tidak ditemukan',
                'data' => null
            ],404);
        }
        $rekammedis->delete();
        return response()->json([
            'message' => 'Berhasil menghapus data rekam medis',
            'data' => $rekammedis
        ],200);
    }
}
