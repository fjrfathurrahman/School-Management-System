<?php

namespace App\Http\Controllers\User;

use App\Helpers\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\User;
use App\Models\User\Student;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            return ApiResponseHelper::error('Gagal mengambil data siswa: ' . $th->getMessage());
        }
    }


    /**
     * Store a newly created student .
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        try {
            // validate
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'nis' => 'required|string|unique:students,nis',
                'nisn' => 'required|string|unique:students,nisn',
                'gender' => 'required|string',
                'birth_place' => 'required|string',
                'birth_date' => 'required|date',
                'phone' => 'required|string',
                'address' => 'required|string',
                'religion' => 'required|string',
                'avatar' => 'nullable|string',

                'class_id' => 'nullable|exists:classes,id',
                'major_id' => 'nullable|exists:majors,id',
            ]);

            // check validation
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            // create data user
            $user = User::create([
                'username' => 'student' . time(),
                'email' => 'student' . time() . '@bppi.sch',
                'password' => Hash::make('password'),
                'user_type' => 'student',
            ]);

            // role as student
            $user->assignRole('student');

            // create data student
            $user->student()->create([
                'name' => $request->name,
                'nis' => $request->nis,
                'nisn' => $request->nisn,
                'gender' => $request->gender,
                'birth_place' => $request->birth_place,
                'birth_date' => $request->birth_date,
                'phone' => $request->phone,
                'address' => $request->address,
                'religion' => $request->religion,
                'avatar' => $request->avatar,

                'class_id' => $request->class_id,
                'major_id' => $request->major_id
            ]);

            // create activity
            activity()
                ->performedOn($user)
                ->causedBy(auth()->user())
                ->log('Created a new student' . $user->student->name);

            return redirect()->route('student.list')->with('success', 'Berhasil menambahkan data siswa.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menambahkan data siswa: ' . $th->getMessage());
        }
    }
}
