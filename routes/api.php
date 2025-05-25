<?php

use App\Http\Controllers\User\StudentController;
use Illuminate\Support\Facades\Route;

// API
Route::prefix('v1')->group(function () {
    
    // Students
    Route::get('/students', [StudentController::class, 'indexApi'])->name('students.index');
    
    // Academic
    Route::get('academic', function () {
        return response()->json([
            'classes' => \App\Models\Academic\Classes::all(),
            'majors' => \App\Models\Academic\Major::all(),
        ]);
    });
});
