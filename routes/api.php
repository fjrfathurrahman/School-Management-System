<?php

use App\Http\Controllers\Academic\HomeRoomController;
use App\Http\Controllers\User\StudentController;
use App\Http\Controllers\User\TeacherController;
use Illuminate\Support\Facades\Route;

// API
Route::prefix('v1')->group(function () {

    // HomeRoom
    Route::get('/homeRoom', [HomeRoomController::class, 'indexApi'])->name('homeRoom.index');
    
    // Teachers
    Route::get('/teachers', [TeacherController::class, 'indexApi'])->name('teachers.index');
    Route::put('/teachers/{id}', [TeacherController::class, 'updateApi'])->name('teachers.update');
    Route::delete('/teachers/{id}', [TeacherController::class, 'destroyApi'])->name('teachers.detroy');


    // Students 
    // NOTE: perlu diperbaiki url
    Route::get('/students', [StudentController::class, 'indexApi'])->name('students.index');
    Route::delete('/students/{id}', [StudentController::class, 'destroyApi'])->name('students.destroy');
    Route::put('/students/{id}', [StudentController::class, 'updateApi'])->name('students.update');

    // Academic
    // NOTE: perlu diperbaiki dibuat di controller
    Route::get('academic', function () {
        return response()->json([
            'classes' => \App\Models\Academic\Classes::all(),
            'majors' => \App\Models\Academic\Major::all(),
        ]);
    });
});
