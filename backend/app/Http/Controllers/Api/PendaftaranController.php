<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $perPage = $request->input('perPage', 10);
        $orderBy = $request->input('orderBy', 'created_at');
        

        $allowedSort = ['created_at', 'tanggal_pendaftaran', 'status', 'nama_pasien', 'nama_dokter', 'nama_ruang', 'nomor_identitas'];

        if(!in_array($orderBy, $allowedSort)){
            $orderBy = 'created_at';
        }

        $query = Pendaftaran::orderBy($orderBy)
            ->join('users', 'pendaftarans.user_id', '=', 'users.id')
            ->join('dokters', 'pendaftarans.dokter_id', '=', 'dokters.id')
            ->join('ruangs', 'pendaftarans.ruang_id', '=', 'ruangs.id')
            ->select('pendaftarans.*', 'users.nama as nama_pasien', 'dokters.nama as nama_dokter', 'ruangs.nama as nama_ruang', 'users.nomor_identitas');

        if ($request->has('status') ) {  
            $filter = $request->input('status');
            if($filter == 'selesai' || $filter == 'pending'){
                $query->where('pendaftarans.status', $filter);
            }
        }
            
        $count = $query->count();
        
        $data = $query->paginate($perPage);

        return response()->json([
            'message' => 'Berhasil menampilkan data pendaftaran',
            'data' => $data,
            'total' => $count,
            'filter' => $request->input('status')
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $storeData = $request->all();

        $validate = Validator::make($storeData, [
            'user_id' => 'required|exists:users,id',
            'dokter_id' => 'required|exists:dokters,id',
            'ruang_id' => 'required|exists:ruangs,id',
            'tanggal_pendaftaran' => 'required|date',
            'status' => 'required|in:selesai,pending'
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => $validate->errors()
            ],400);
        }

        $isUniquePending = Pendaftaran::where('user_id', $storeData['user_id'])->where('status', 'pending')->first();

        if(!is_null($isUniquePending)){
            return response()->json([
                'message' => 'Selesaikan dulu pendaftaran sebelumnya!'
            ],400);
        }

        $pendaftaran = Pendaftaran::create($storeData);

        return response()->json([
            'message' => 'Berhasil menambahkan data pendaftaran',
            'data' => $pendaftaran
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $pendaftaran = Pendaftaran::find($id);
        if(is_null($pendaftaran)){
            return response()->json([
                'message' => 'Data pendaftaran tidak ditemukan',
                'data' => null
            ],404);
        }
        return response()->json([
            'message' => 'Berhasil menampilkan data pendaftaran',
            'data' => $pendaftaran
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $pendaftaran = Pendaftaran::find($id);
        if(is_null($pendaftaran)){
            return response()->json([
                'message' => 'Data pendaftaran tidak ditemukan',
                'data' => null
            ],404);
        }
        $updateData = $request->all();
        $validate = Validator::make($updateData, [
            'user_id' => 'required|exists:users,id',
            'dokter_id' => 'required|exists:dokters,id',
            'ruang_id' => 'required|exists:ruangs,id',
            'tanggal_pendaftaran' => 'required|date',
            'status' => 'required|in:selesai,pending'
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Gagal mengubah data pendaftaran',
                'error' => $validate->errors()
            ],400);
        }
        
        $pendaftaran->update($updateData);
        return response()->json([
            'message' => 'Berhasil mengubah data pendaftaran',
            'data' => $pendaftaran
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $pendaftaran = Pendaftaran::find($id);
        if(is_null($pendaftaran)){
            return response()->json([
                'message' => 'Data pendaftaran tidak ditemukan',
                'data' => null
            ],404);
        }
        $pendaftaran->delete();
        return response()->json([
            'message' => 'Berhasil menghapus data pendaftaran',
            'data' => $pendaftaran
        ],200);
    }
}
