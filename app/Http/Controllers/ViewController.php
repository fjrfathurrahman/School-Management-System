<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\User\Student;
use App\Models\User\Teachers;
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


    /**
     * View Page untuk admin
     *
     * Halaman-halaman yang akan di akses oleh admin
     * dan hanya dapat di akses oleh admin
     */

    // Dashboard
    public function dashboard()
    {
        return Inertia::render('admin/dashboard');
    }

    // List Student
    public function studentList(Request $request)
    {
        return Inertia::render('admin/student/ListStudent');
    }

    // Detail Student
    public function studentDetail(Student $student)
    {
        $student = Student::fullRelationship()->findOrFail($student->id);

        return Inertia::render('admin/student/DetailStudent', [
            'response' => new StudentResource($student),
        ]);
    }

    
    // List Teacher
    public function teacherList(Request $request)
    {
        return Inertia::render('admin/teacher/ListTeacher');
    }

    // List HomeRoom Teacher
    public function homeRoomTeacher(Request $request)
    {
        return Inertia::render('admin/academic/ListHomeRoomTeacher');
    }
}