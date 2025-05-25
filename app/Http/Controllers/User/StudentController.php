<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\User\Student;
use Illuminate\Http\Request;
use Schema;
use Spatie\QueryBuilder\QueryBuilder;

class StudentController extends Controller
{
    public function indexApi(Request $request)
    {
        try {
            $query = Student::fullRelationship();

            // Filter: Search (by name or NISN)
            if ($request->filled('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                        ->orWhere('nisn', 'like', "%$search%");
                });
            }

            // Filter: Class
            if ($request->filled('class')) {
                $query->whereHas('class', function ($q) use ($request) {
                    $q->where('name', $request->input('class'));
                });
            }

            // Filter: Major
            if ($request->filled('major')) {
                $query->whereHas('major', function ($q) use ($request) {
                    $q->where('short', $request->input('major'));
                });
            }

            // Sorting (with fallback & whitelist to prevent SQL injection)
            $allowedSortFields = ['name', 'nisn', 'created_at'];
            $sortBy = in_array($request->input('sort_by'), $allowedSortFields)
                ? $request->input('sort_by')
                : 'name';

            $sortOrder = $request->input('sort') === 'desc' ? 'desc' : 'asc';

            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = (int) $request->input('perPage', 10);
            $students = $query->paginate($perPage);

            return StudentResource::collection($students)->additional([
                'status' => 'success',
                'message' => 'Students retrieved successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to retrieve students: ' . $th->getMessage(),
            ], 500);
        }
    }

}
