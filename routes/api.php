<?php

use App\Http\Controllers\Api\PassportAuthController;
use App\Http\Controllers\FlightController;
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
Route::get('flights', [FlightController::class, 'index'])->name('flight.index');
Route::get('flights/{flight}', [FlightController::class, 'show'])->name('flight.show');
Route::get('places/available/{flight}', [\App\Http\Controllers\PlaceController::class, 'getAvailablePlaces']);
Route::get('firms', [\App\Http\Controllers\FirmController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::post('tickets/{flight}/buy', [\App\Http\Controllers\TicketController::class, 'buyTicket']);
    Route::post('logout', [PassportAuthController::class, 'logout']);
    Route::post('change-password', [PassportAuthController::class, 'changePassword']);
    Route::get('user/personal_info', [\App\Http\Controllers\UserController::class, 'personalInfo']);


    Route::middleware('adminauth')->group(function() {
        Route::resource('planes', PlaneController::class)->except(['index', 'show']);
        Route::resource('flights', FlightController::class)->except(['index', 'show']);
    });
});
