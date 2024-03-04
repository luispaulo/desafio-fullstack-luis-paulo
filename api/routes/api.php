<?php

use App\Http\Controllers\PlanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContractPlanController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json(['message' => 'ok']);
});

Route::prefix('user')->group( function () {
    Route::get('/', [UserController::class, 'show']);
});

Route::prefix('plans')->group(function () {
    Route::get('/', [PlanController::class, 'index']);
    Route::get('/{id}', [PlanController::class, 'show']);
});

Route::prefix('contracts')->group(function () {
    Route::get('/', [ContractPlanController::class, 'index']);
    Route::get('/historic/{userId}', [ContractPlanController::class, 'historic']);
    Route::get('/{userId}', [ContractPlanController::class, 'show']);
    Route::post('/', [ContractPlanController::class, 'store']);
    Route::post('/pay', [ContractPlanController::class, 'storePay']);

});