<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\Users;
use App\Models\Ticket;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::prefix('/api')->group(function () {
    Route::get('/users', [Users::class, "index"])->name('users.all')->middleware('checkToken');
    Route::post('/users', [Users::class, "store"])->name('users.post')->middleware('checkToken');
    Route::post('/login', [LoginController::class, 'store']);
    Route::get('/tickets/all', [TicketController::class, "fetchAll"])->name('tickets.all')->middleware('checkToken');
    Route::resource('/tickets', TicketController::class)->middleware('checkToken');
});

Route::fallback(AppController::class);
