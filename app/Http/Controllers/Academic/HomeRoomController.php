<?php

namespace App\Http\Controllers\Academic;

use App\Helpers\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\HomeRoomReasource;
use App\Http\Resources\TeacherResource;
use App\Models\User\Student;
use Illuminate\Http\Request;
use App\Models\Academic\HomeroomTeacher;

class HomeRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexApi(Request $request)
    {
        try {

            $homeRoom = HomeroomTeacher::fullRelationship();

            //  apply filters by name or NIP
            if ($request->filled('search')) {
                $search = $request->input('search');
                $homeRoom->where(function ($q) use ($search) {
                    $q->where('teacher_id', 'like', "%$search%")
                        ->orWhere('major_id', 'like', "%$search%")
                        ->orWhere('classes_id', 'like', "%search%");
                });
            }

            // allow sorting by specified fields
            $allowedSortFields = ['classes_id', 'major_id', 'teacher_id', 'tahun_ajaran', 'semester', 'created_at'];
            $sortBy = in_array($request->input('sort_by'), $allowedSortFields) ? $request->input('sort_by') : 'teacher_id';

            // allow sorting in ascending or descending order
            $sortOrder = $request->input('sort') === 'desc' ? 'desc' : 'asc';
            $homeRoom->orderBy($sortBy, $sortOrder);

            // eksekusi query
            $data = $homeRoom->get();

            $response = [
                'data' => HomeRoomReasource::collection($data,),
            ];


            // return response
            return ApiResponseHelper::success($response, 'Berhasil mengambil data wali kelas');
        } catch (\Throwable $th) {
            return ApiResponseHelper::error('Gagal mengambil data wali kelas: ' . $th->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
