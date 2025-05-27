<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $studentId = $this->route('student');

        return [
            'name' => 'required|string',
            'nis' => [
                'required',
                'string',
                Rule::unique('students', 'nis')->ignore($studentId),
            ],
            'nisn' => [
                'required',
                'string',
                Rule::unique('students', 'nisn')->ignore($studentId),
            ],
            'gender' => 'required|string',
            'birth_place' => 'required|string',
            'birth_date' => 'required|date',
            'phone' => 'required|string',
            'address' => 'required|string',
            'religion' => 'required|string',
            'avatar' => 'nullable|string',
            'class_id' => 'nullable|exists:classes,id',
            'major_id' => 'nullable|exists:majors,id',
        ];
    }

}
