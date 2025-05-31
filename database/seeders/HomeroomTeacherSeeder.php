<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User\Teachers;
use App\Models\Academic\Classes;
use App\Models\Academic\HomeroomTeacher;
use App\Models\Academic\Major;

class HomeroomTeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = Teachers::all();
        $classes = Classes::all();
        $majors = Major::all();

        for ($i = 0; $i < 10; $i++) {
            HomeroomTeacher::create([
                'teacher_id' => $teachers->random()->id,
                'classes_id' => $classes->random()->id,
                'major_id' => $majors->random()->id,
                'school_year' => fake()->year(),
                'semester' => fake()->randomElement(['Ganjil', 'Genap']),
            ]);
        }

    }
}
