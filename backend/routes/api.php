<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DokterController;
use App\Http\Controllers\Api\PasienController;
use App\Http\Controllers\Api\PendaftaranController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RekamMedisController;
use App\Http\Controllers\Api\RuangController;
use App\Http\Controllers\Api\UtilityController;
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

    //Route for admin dokter page
    Route::get('/dokters', [DokterController::class, 'index']);
    Route::get('/dokters/{id}', [DokterController::class, 'show']);
    Route::post('/dokters', [DokterController::class, 'store']);
    Route::put('/dokters/{id}', [DokterController::class, 'update']);
    Route::delete('/dokters/{id}', [DokterController::class, 'destroy']);

    //Route for admin ruang page
    Route::get('/ruangs', [RuangController::class, 'index']);
    Route::get('/ruangs/{id}', [RuangController::class, 'show']);
    Route::post('/ruangs', [RuangController::class, 'store']);
    Route::put('/ruangs/{id}', [RuangController::class, 'update']);
    Route::delete('/ruangs/{id}', [RuangController::class, 'destroy']);

    //Route for admin pendaftarans page
    Route::get('/pendaftarans', [PendaftaranController::class, 'index']);
    Route::get('/pendaftarans/{id}', [PendaftaranController::class, 'show']);
    Route::post('/pendaftarans', [PendaftaranController::class, 'store']);
    Route::put('/pendaftarans/{id}', [PendaftaranController::class, 'update']);
    Route::delete('/pendaftarans/{id}', [PendaftaranController::class, 'destroy']);

    //Route for admin rekammedis page
    Route::get('/rekammedis', [RekamMedisController::class, 'index']);
    Route::get('/rekammedis/{id}', [RekamMedisController::class, 'show']);
    Route::post('/rekammedis', [RekamMedisController::class, 'store']);
    Route::put('/rekammedis/{id}', [RekamMedisController::class, 'update']);
    Route::delete('/rekammedis/{id}', [RekamMedisController::class, 'destroy']);


    //Route for utility
    Route::get('/countPasien', [UtilityController::class, 'getCountPasien']);
    Route::get('/countDokter', [UtilityController::class, 'getCountDokter']);
    Route::get('/countRuang', [UtilityController::class, 'getCountRuang']);
    Route::get('/countPendaftaran', [UtilityController::class, 'getCountPendaftaran']);
    Route::get('/countRekamMedis', [UtilityController::class, 'getCountRekamMedis']);
    Route::get('/recentPasien', [UtilityController::class, 'getRecentPasien']);

    //Route for user profile
    Route::get('/pendaftaranProfile/{id}', [ProfileController::class, 'pendaftaran']);
    Route::get('/rekamMedisProfile/{id}', [ProfileController::class, 'rekammedis']);
});