<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $regisData = $request->all();

        $validate = Validator::make($regisData, [
            'nama' => 'required|min:3|max:50',
            'email' => 'required|email:rfc,dns|unique:users',
            'password' => 'required|min:8|max:50',
            'nomor_identitas' => 'required|digits_between:16,16|unique:users',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'nomor_telepon' => 'required|digits_between:10,13',
            'alamat' => 'required|min:10|max:255',
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Register Failed!',
                'error' => $validate->errors()
            ],400);
        }

        $regisData['password'] = bcrypt($request->password);
        $regisData['role'] = 'USER';

        $user = User::create($regisData);
        $user->sendEmailVerificationNotification();


        return response()->json([
            'message' => 'Register Success!',
            'user' => $user
        ],201);
    }

    public function login(Request $request){
        $loginData = $request->all();

        $validate = Validator::make($loginData,[
            // 'email' => 'required|email:rfc,dns',
            'email'=> 'required',
            'password' => 'required'
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'Login Failed!',
                'error' => $validate->errors()
            ],400);
        }

        if(!Auth::attempt($loginData)){
            return response()->json([
                'message' => 'Login Failed!',
                'data' => 'Unauthorized'
            ],401);
        }

        
        /**@var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('token')->accessToken;

        return response()->json([
            'id' => $user['id'],
            'email' => $user['email'],
            'email_verified_at' => $user['email_verified_at'],
            'token' => $token,
            'role' => $user['role']
        ],200);
    }
}
