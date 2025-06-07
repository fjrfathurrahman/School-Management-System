<?php

namespace App\Http\Controllers\User;

use App\Helpers\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\User;
use App\Models\User\Student;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class StudentController extends Controller
{
    /**
     * Handle the request to retrieve a paginated list of students with optional filters, sorting, and relationships.
     *
     * This method supports filtering by student name, NISN, class, and major. It allows sorting based 
     * on specified fields and defaults to sorting by name in ascending order if not specified. 
     * Pagination is also supported with a default of 10 students per page if not specified.
     *
     * @param Request $request The incoming HTTP request containing potential filters, sorting, and pagination parameters.
     * @return \Illuminate\Http\JsonResponse A JSON response containing the paginated list of students 
     */
    public function indexApi(Request $request)
    {
        try {
            // query builder with relationships
            $query = Student::fullRelationship();

            // apply filters by name or NISN
            if ($request->filled('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                        ->orWhere('nisn', 'like', "%$search%");
                });
            }

            // apply filters by class
            if ($request->filled('class')) {
                $query->whereHas('class', function ($q) use ($request) {
                    $q->where('name', $request->input('class'));
                });
            }

            // apply filters by major
            if ($request->filled('major')) {
                $query->whereHas('major', function ($q) use ($request) {
                    $q->where('short', $request->input('major'));
                });
            }

            // allow sorting by specified fields
            $allowedSortFields = ['name', 'nisn', 'created_at'];
            $sortBy = in_array($request->input('sort_by'), $allowedSortFields) ? $request->input('sort_by') : 'name';

            // allow sorting in ascending or descending order
            $sortOrder = $request->input('sort') === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortBy, $sortOrder);

            // apply pagination
            $perPage = (int) $request->input('perPage', 10);
            $students = $query->paginate($perPage);

            // check if data is empty
            if ($students->isEmpty()) {
                return ApiResponseHelper::error('Data siswa tidak ditemukan', 404);
            }

            // prepare response
            $response = [
                'data' => StudentResource::collection($students->items()),
                'meta' => [
                    'current_page' => $students->currentPage(),
                    'last_page' => $students->lastPage(),
                    'per_page' => $students->perPage(),
                    'total' => $students->total(),
                    'from' => $students->firstItem(),
                    'to' => $students->lastItem(),
                    'has_more_pages' => $students->hasMorePages(),
                    'next_page_url' => $students->nextPageUrl(),
                    'prev_page_url' => $students->previousPageUrl(),
                ]
            ];

            // return response
            return ApiResponseHelper::success($response, 'Berhasil mengambil data siswa');
        } catch (\Throwable $th) {
            return ApiResponseHelper::error('Terjadi kesalahan: ' . $th->getMessage());
        }
    }


    /**
     * Store a newly created student .
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StudentRequest $request)
    {
        try {
            $user = User::create([
                'username' => 'student_' . Str::random(6),
                'email' => 'student_' . Str::random(6) . '@bppi.sch',
                'password' => Hash::make('password'),
                'user_type' => 'student',
            ]);

            $user->assignRole('student');

            $user->student()->create($request->validated());

            activity()
                ->performedOn($user)
                ->causedBy(auth()->user())
                ->log("Created a new student: {$user->student->name}");

            return redirect()->route('student.list')->with('success', 'Berhasil menambahkan data siswa.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $th->getMessage());
        }
    }

    public function updateApi(StudentRequest $request, String $id){
        try {
            
            $student = Student::find($id);

            if (!$student) {
                return ApiResponseHelper::error('Siswa tidak ditemukan', 404);
            }

            $student->update($request->all());

            activity()
                ->causedBy(auth()->user())
                ->log("Updated a student: {$student->name}");

            return redirect()->route('student.detail', ['student' => $student->id])->with('success', 'Berhasil mengubah data siswa.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $th->getMessage());
        }
    }

    /**
     * Delete the specified student.
     *
     * @param int $id ID Siswa
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyApi($id)
    {
        try {
            $student = Student::find($id);

            if (!$student) {
                return ApiResponseHelper::error('Siswa tidak ditemukan', 404);
            }   

            $student->delete();
            
            activity()
                ->causedBy(auth()->user())
                ->log("Deleted a student: {$student->name}");

            return ApiResponseHelper::success([], 'Berhasil menghapus data siswa');
        } catch (\Throwable $th) {
            return ApiResponseHelper::error('Terjadi kesalahan: ' . $th->getMessage());
        }
    }
}
