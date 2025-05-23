<?php

use App\Http\Controllers\ViewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', [ViewController::class, 'home'])->name('home');

// Routes for role admin 
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ViewController::class, 'dashboard'])->name('dashboard');

    // roles students
    Route::get('/siswa', [ViewController::class, 'studentList'])->name('student.list');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
