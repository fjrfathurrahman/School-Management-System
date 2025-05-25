<?php

use App\Http\Controllers\User\StudentController;
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


// Routes Action for role admin
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('students', StudentController::class)->names('students')->only(['store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
