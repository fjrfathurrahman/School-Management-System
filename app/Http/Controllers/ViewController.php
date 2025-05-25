<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\User\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ViewController extends Controller
{
    // Home
    public function home()
    {
        return Inertia::render('welcome');
    }

    
    // View Page untuk admin 


    // Dashboard
    public function dashboard()
    {
        return Inertia::render('admin/dashboard');
    }

    public function studentList(Request $request)
    {
        return Inertia::render('admin/student/ListStudent');
    }
}