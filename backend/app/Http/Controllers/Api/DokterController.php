<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $perPage = $request->input('perPage', 10);
        $orderBy = $request->input('orderBy', 'created_at');
        $filter = $request->input('jenis_kelamin');

        $allowedSort = ['created_at', 'nama', 'spesialis', 'nomor_izin_praktek', 'alamat', 'jenis_kelamin', 'no_telp'];

        if(!in_array($orderBy, $allowedSort)){
            $orderBy = 'created_at';
        }

        $query = Dokter::orderBy($orderBy);

        if($filter){
            $query->where('jenis_kelamin', $filter);
        }

        $count = $query->count();

        $dokter = $query->paginate($perPage);

        return response()->json([
            'message' => 'Berhasil menampilkan data dokter',
            'data' => $dokter,
            'total' => $count
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
            'nama' => 'required|min:3|max:50',
            'spesialis' => 'required|min:5|max:50',
            'nomor_izin_praktek' => 'required|digits:12|unique:dokters',
            'alamat' => 'required|min:5|max:60',
            'jenis_kelamin' => 'required|in:L,P',
            'no_telp' => 'required|digits_between:10,13',
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Data dokter gagal ditambahkan',
                'error' => $validate->errors()
            ],400);
        }

        $dokter = Dokter::create($storeData);
        return response()->json([
            'message' => 'Berhasil menambahkan data dokter',
            'data' => $dokter
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $dokter = Dokter::find($id);

        if(is_null($dokter)){
            return response()->json([
                'message' => 'Data dokter tidak ditemukan',
                'data' => null
            ],404);
        }

        return response()->json([
            'message' => 'Berhasil menampilkan data dokter',
            'data' => $dokter
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $dokter = Dokter::find($id);
        $updateData = $request->all();
        
        if(is_null($dokter)){
            return response()->json([
                'message' => 'Data dokter tidak ditemukan',
                'data' => null
            ],404);
        }

        $validate = Validator::make($updateData, [
            'nama' => 'required|min:3|max:50',
            'spesialis' => 'required|min:5|max:50',
            'nomor_izin_praktek' => 'required|digits:12|unique:dokters,nomor_izin_praktek,'.$dokter->id.',id',
            'alamat' => 'required|min:5|max:60',
            'jenis_kelamin' => 'required|in:L,P',
            'no_telp' => 'required|digits_between:10,13',
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Data dokter gagal diubah',
                'error' => $validate->errors()
            ],400);
        }

        $dokter->update($updateData);
        return response()->json([
            'message' => 'Berhasil mengubah data dokter',
            'data' => $dokter
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $dokter = Dokter::find($id);
        if(is_null($dokter)){
            return response()->json([
                'message' => 'Data dokter tidak ditemukan',
                'data' => null
            ],404);
        }
        $dokter->delete();
        return response()->json([
            'message' => 'Berhasil menghapus data dokter',
            'data' => $dokter
        ],200);
    }
}
