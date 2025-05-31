<?php

namespace App\Http\Controllers\User;

use App\Helpers\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\TeacherResource;
use App\Models\User;
use App\Models\User\Teachers;
use Hash;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexApi(Request $request)
    {
        try {
            $query = Teachers::fullRelationship();

            //  apply filters by name or NIP
            if ($request->filled('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                        ->orWhere('nip', 'like', "%$search%");
                });
            }

            // allow sorting by specified fields
            $allowedSortFields = ['name', 'nip', 'created_at'];
            $sortBy = in_array($request->input('sort_by'), $allowedSortFields) ? $request->input('sort_by') : 'name';

            // allow sorting in ascending or descending order
            $sortOrder = $request->input('sort') === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortBy, $sortOrder);

            // apply pagination
            $perPage = (int) $request->input('perPage', 10);
            $teachers = $query->paginate($perPage);

            // check if data is empty
            if ($teachers->isEmpty()) {
                return ApiResponseHelper::error('Data Guru tidak ditemukan', 404);
            }

            // prepare response
            $response = [
                'data' => TeacherResource::collection($teachers->items()),
                'meta' => [
                    'current_page' => $teachers->currentPage(),
                    'last_page' => $teachers->lastPage(),
                    'per_page' => $teachers->perPage(),
                    'total' => $teachers->total(),
                    'from' => $teachers->firstItem(),
                    'to' => $teachers->lastItem(),
                    'has_more_pages' => $teachers->hasMorePages(),
                    'next_page_url' => $teachers->nextPageUrl(),
                    'prev_page_url' => $teachers->previousPageUrl(),
                ]
            ];

            // return response
            return ApiResponseHelper::success($response, 'Berhasil mengambil data guru');
        } catch (\Throwable $th) {
            return ApiResponseHelper::error('Gagal mengambil data guru: ' . $th->getMessage());

        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = validator($request->all(), [
                'nip' => ['required', 'string', 'max:255'],
                'name' => ['required', 'string', 'max:255'],
                'phone_number' => ['nullable', 'string', 'max:255'],
                'address' => ['nullable', 'string', 'max:255'],
                'entry_date' => ['nullable', 'date', 'max:255'],
                'date_of_birth' => ['nullable', 'date', 'max:255'],
                'place_of_birth' => ['nullable', 'string', 'max:255'],
                'education' => ['nullable', 'string', 'max:255'],
                'position' => ['nullable', 'string', 'max:255'],
                'status' => ['required', 'in:aktif,nonaktif'],
                'gender' => ['nullable', 'in:female,male'],
                'avatar' => ['nullable', 'string', 'max:255'],
            ]);

            // check validation
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            // create data user
            $user = User::create([
                'username' => 'teacher' . time(),
                'email' => 'teacher' . time() . '@bppi.sch',
                'password' => Hash::make('password'),
                'user_type' => 'teacher',
            ]);

            // Assign the role of teacher to the user
            $user->assignRole('teacher');


            Teachers::create([
                'user_id' => $user->id,
                'nip' => $request->nip,
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'entry_date' => $request->entry_date,
                'date_of_birth' => $request->date_of_birth,
                'place_of_birth' => $request->place_of_birth,
                'education' => $request->education,
                'position' => $request->position,
                'status' => $request->status,
                'gender' => $request->gender,
                'avatar' => $request->avatar,
            ]);


            //create Activity
            activity()
                ->performedOn($user)
                ->causedBy(auth()->user())
                ->log('Created new teacher' . $user->teacher->name);

            return redirect()->route('teacher.list')->with('success', 'Berhasil menambahkan data Guru.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menambahkan data Guru: ' . $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
