<?php

use App\Http\Controllers\User\StudentController;
use App\Http\Controllers\User\TeacherController;
use App\Http\Controllers\ViewController;
use Illuminate\Support\Facades\Route;

// Home
Route::get('/', [ViewController::class, 'home'])->name('home');

// Routes for role admin 
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ViewController::class, 'dashboard'])->name('dashboard');


    // Teachers
    Route::get('/guru', [ViewController::class, 'teacherList'])->name('teacher.list');
    Route::get('/guru/{teachers}', [ViewController::class, 'teacherDetail'])->name('teacher.detail');


    // Students
    Route::get('/siswa', [ViewController::class, 'studentList'])->name('student.list');
    Route::get('/siswa/{student}', [ViewController::class, 'studentDetail'])->name('student.detail');
});


// Routes Action for role admin
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {

    // Routes for action teacher (CRUD)
    Route::resource('teachers', TeacherController::class)->names('teacher')->only(['store', 'update', 'destroy']);

    // Routes for action student (CRUD)
    Route::resource('students', StudentController::class)->names('student')->only(['store', 'update', 'destroy']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
