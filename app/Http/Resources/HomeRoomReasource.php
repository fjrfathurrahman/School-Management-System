<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class HomeRoomReasource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'school_year' => $this->school_year,
            'semester' => $this->semester,
            'class' => [
                'classes_id' => $this->classes_id,
                'name' => $this->class->name ?? null,
            ],
            'major' => [
                'major_id' => $this->major_id,
                'name' => $this->major->name ?? null,
            ],
            'teacher' => [
                'teacher_id' => $this->teacher_id,
                'name' => $this->teacher->name ?? null,
            ],
            'students_count' => $this->students_count ?? 0
        ];
    }
}
