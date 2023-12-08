<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PasienController extends Controller
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

        $allowedSort = ['created_at', 'nama', 'email', 'nomor_identitas', 'tanggal_lahir', 'jenis_kelamin', 'nomor_telepon', 'alamat'];

        if(!in_array($orderBy, $allowedSort)){
            $orderBy = 'created_at';
        }

        $query = User::orderBy($orderBy);

        if($filter){
            $query->where('jenis_kelamin', $filter);
        }
        
        $count = $query->count();

        $pasien = $query->paginate($perPage);
        
        return response()->json([
            'message' => 'Berhasil menampilkan data pasien',
            'data' => $pasien,
            'total' => $count
        ], 200);
    }

  
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $pasien = User::find($id);
        if(is_null($pasien)){
            return response()->json([
                'message' => 'Data pasien tidak ditemukan',
                'data' => null
            ],404);
        }
        return response()->json([
            'message' => 'Berhasil menampilkan data pasien',
            'data' => $pasien
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $pasien = User::find($id);
        if(is_null($pasien)){
            return response()->json([
                'message' => 'Data pasien tidak ditemukan',
                'data' => null
            ],404);
        }
        $updateData = $request->all();

        $validate = Validator::make($updateData, [
            'nama' => 'required|min:3|max:50',
            'password' => 'required|min:8|max:50',
            'email' => 'required|email:rfc,dns|unique:users,email,'.$pasien->id.',id',
            'nomor_identitas' => 'required|digits_between:16,16|unique:users,nomor_identitas,'.$pasien->id.',id',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'nomor_telepon' => 'required|digits_between:10,13',
            'alamat' => 'required|min:10|max:255',
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Gagal mengubah data pasien',
                'error' => $validate->errors()
            ],400);
        }

        if($updateData['password'] == "12345678"){
            $updateData['password'] = $pasien->password;
        }

        $updateData['password'] = bcrypt($request->password);
        $pasien->update($updateData);
        return response()->json([
            'message' => 'Berhasil mengubah data pasien',
            'data' => $pasien
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $pasien = User::find($id);
        if(is_null($pasien)){
            return response()->json([
                'message' => 'Data pasien tidak ditemukan',
                'data' => null
            ],404);
        }
        $pasien->delete();
        return response()->json([
            'message' => 'Berhasil menghapus data pasien',
            'data' => $pasien
        ],200);
    }

    
}
