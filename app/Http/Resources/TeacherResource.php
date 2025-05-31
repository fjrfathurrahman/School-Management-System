<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
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
            'nip' => $this->nip,
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'entry_date' => $this->entry_date,
            'date_of_birth' => $this->date_of_birth,
            'place_of_birth' => $this->place_of_birth,
            'education' => $this->education,
            'position' => $this->position,
            'status' => $this->status,
            'gender' => $this->gender,
            'avatar' => $this->avatar,
            'user' => [
                'user_id' => $this->user_id,
                'username' => $this->user->username,
                'email' => $this->user->email,
                'user_type' => $this->user->user_type
            ]
        ];
        
    }
}

