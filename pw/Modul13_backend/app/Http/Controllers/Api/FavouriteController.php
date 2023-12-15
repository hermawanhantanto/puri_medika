<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use App\Models\Favourites;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FavouriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(String $id_user)
    {
        //
        $user = User::find($id_user);
        if(is_null($user)){
            return response([
                'message' => 'User Not Found',
                'data' => null
            ],404);
        }

        $favourites = Favourites::where('id_user', $id_user)->get()->map(function($favourite){
            return [
                'id' => $favourite->id,
                'id_user' => $favourite->id_user,
                'id_content' => $favourite->id_content,
                'content' => $favourite->content,
            ];
        });

        return response([
            'message' => 'All Favourites Retrieved',
            'data' => $favourites
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $storeData = $request->all();
        $validate = Validator::make($storeData,[
            'id_content' => 'required',
        ]);

        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }
        
        $id_user = Auth::user()->id;
        $user = User::find($id_user);
        if(is_null($user)){
            return response([
                'message' => 'User Not Found',
                'data' => null
            ],404);
        }

        $content = Contents::find($storeData['id_content']);
        if(is_null($content)){
            return response([
                'message' => 'Content Not Found',
                'data' => null
            ],404);
        }

        $favourites = Favourites::where('id_user', $id_user)->where('id_content', $storeData['id_content'])->first();
        if(!is_null($favourites)){
            return response([
                'message' => 'Favourite Already Exists',
                'data' => null
            ],400);
        }

        $favourites = Favourites::create([
            'id_user' => $id_user,
            'id_content' => $storeData['id_content'],
        ]);
        
        return response()->json([
            'message' => 'Favourite Created',
            'data' => $favourites
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $favourites = Favourites::find($id);
        
        if(is_null($favourites)){
            return response([
                'message' => 'Favourite Not Found',
                'data' => null
            ],404);
        }
        $favourites->delete();
        return response([
            'message' => 'Favourite Deleted',
            'data' => $favourites
        ],200);
    }
}
