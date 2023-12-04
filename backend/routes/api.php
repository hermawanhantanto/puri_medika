<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PasienController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Auth::routes(['verify' => true]);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/verify-email/{id}/{hash}', function (Request $request) {
    $user = App\Models\User::findOrFail($request->id);

    if ($request->hash === sha1($user->getEmailForVerification())) {
        $user->markEmailAsVerified();

        $loginUrl = 'http://localhost:5173/login';

    
        return redirect()->away($loginUrl);
    }

   
    return response()->json(['message' => 'Invalid verification link'], 403);
})->name('verification.verify');

Route::middleware('auth:api')->group(function(){

    //Route for admin pasien page
    Route::get('/pasiens', [PasienController::class, 'index']);
    Route::get('/pasiens/{id}', [PasienController::class, 'show']);
    Route::put('/pasiens/{id}', [PasienController::class, 'update']);
    Route::delete('/pasiens/{id}', [PasienController::class, 'destroy']);

    
});