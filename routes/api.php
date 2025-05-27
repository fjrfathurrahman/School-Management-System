<?php

use App\Http\Controllers\User\StudentController;
use Illuminate\Support\Facades\Route;

// API
Route::prefix('v1')->group(function () {
    
    // Students 
    // NOTE: perlu diperbaiki url
    Route::get('/students', [StudentController::class, 'indexApi'])->name('students.index');
    Route::delete('/students/{id}', [StudentController::class, 'destroyApi'])->name('students.destroy');
    Route::put('/students/{id}', [StudentController::class, 'destroyApi'])->name('students.update');

    // Academic
    // NOTE: perlu diperbaiki dibuat di controller
    Route::get('academic', function () {
        return response()->json([
            'classes' => \App\Models\Academic\Classes::all(),
            'majors' => \App\Models\Academic\Major::all(),
        ]);
    });
});
