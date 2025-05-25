<?php

use App\Http\Controllers\User\StudentController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/students', [StudentController::class, 'indexApi'])->name('students.index');
});