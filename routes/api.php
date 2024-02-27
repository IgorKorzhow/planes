<?php

use App\Http\Controllers\Api\PassportAuthController;
use App\Http\Controllers\PlaneController;
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

Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);
Route::get('planes', [PlaneController::class, 'index'])->name('plane.index');
Route::get('planes/{plane}', [PlaneController::class, 'show'])->name('plane.show');

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [PassportAuthController::class, 'logout']);
    Route::get('get-user', [PassportAuthController::class, 'userInfo']);
    Route::post('change-password', [PassportAuthController::class, 'changePassword']);



    Route::middleware('adminauth')->group(function() {
        Route::resource('planes', PlaneController::class)->except(['index', 'show']);
    });
});
