<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ruang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RuangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $perPage = $request->input('perPage', 10);
        $orderBy = $request->input('orderBy', 'created_at');
        $filter = $request->input('status');

        $allowedSort = ['created_at', 'nama', 'keterangan', 'status', 'kapasitas'];

        if(!in_array($orderBy, $allowedSort)){
            $orderBy = 'created_at';
        }

        $query = Ruang::orderBy($orderBy);

        if($filter){
            $query->where('status', $filter);
        }

        $count = $query->count();
        $ruang = $query->paginate($perPage);

        return response()->json([
            'message' => 'Berhasil menampilkan data ruang',
            'data' => $ruang,
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
            'keterangan' => 'required|min:5|max:60',
            'status' => 'required|in:tersedia,tidak tersedia',
            'kapasitas' => 'required|digits_between:1,3',
        ]);

        if($validate->fails())
            return response(['message' => $validate->errors()], 400);

        $ruang = Ruang::create($storeData);
        return response()->json([
            'message' => 'Berhasil menambahkan data ruang',
            'data' => $ruang
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $ruang = Ruang::find($id);
        if(is_null($ruang)){
            return response()->json([
                'message' => 'Data ruang tidak ditemukan',
                'data' => null
            ],404);
        }
        return response()->json([
            'message' => 'Berhasil menampilkan data ruang',
            'data' => $ruang
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $ruang = Ruang::find($id);
        if(is_null($ruang)){
            return response()->json([
                'message' => 'Data ruang tidak ditemukan',
                'data' => null
            ],404);
        }
        $updateData = $request->all();
        $validate = Validator::make($updateData, [
            'nama' => 'required|min:3|max:50',
            'keterangan' => 'required|min:5|max:60',
            'status' => 'required|in:tersedia,tidak tersedia',
            'kapasitas' => 'required|digits_between:1,3',
        ]);
        if($validate->fails()){
            return response()->json([
                'message' => 'Data ruang gagal diupdate',
                'error' => $validate->errors()
            ],400);
        }

        $ruang->update($updateData);

        return response()->json([
            'message' => 'Berhasil mengupdate data ruang',
            'data' => $ruang
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $ruang = Ruang::find($id);
        if(is_null($ruang)){
            return response()->json([
                'message' => 'Data ruang tidak ditemukan',
                'data' => null
            ],404);
        }
        $ruang->delete();
        return response()->json([
            'message' => 'Berhasil menghapus data ruang',
            'data' => $ruang
        ], 200);
    }
}
