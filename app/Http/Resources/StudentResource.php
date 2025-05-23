<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nisn' => $this->nisn,
            'nis' => $this->nis,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'gender' => $this->gender,
            'religion' => $this->religion,
            'birth_place' => $this->birth_place,
            'birth_date' => $this->birth_date,
            'avatar' => $this->avatar,
            'user' => [
                'user_id' => $this->user_id,
                'username' => $this->user->username,
                'email' => $this->user->email,
                'user_type' => $this->user->user_type
            ],
            'classroom' => [
                'class_id' => $this->class_id,
                'name' => $this->class->name
            ],
            'major' => [
                'major_id' => $this->major_id,
                'name' => $this->major->name,
                'slug' => $this->major->slug,
                'description' => $this->major->description
            ],
            'parent' => [
                'parent_id' => $this->parent_id,
                'name' => $this->parent->name,
                'email' => $this->parent->email,
                'phone' => $this->parent->phone,
                'address' => $this->parent->address,
                'gender' => $this->parent->gender,
                'religion' => $this->parent->religion,
                'birth_place' => $this->parent->birth_place,
                'birth_date' => $this->parent->birth_date,
                'avatar' => $this->parent->avatar,
            ]
        ];
    }
}
