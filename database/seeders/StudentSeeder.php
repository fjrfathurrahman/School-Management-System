<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User\Student;
use App\Models\User\UserParent;
use App\Models\Academic\Classes;
use App\Models\Academic\Major;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $classIds = Classes::pluck('id')->toArray();
        $majorIds = Major::pluck('id')->toArray();

        for ($i = 1; $i <= 25; $i++) {
            // Student User
            $studentUser = User::create([
                'username' => 'student' . $i,
                'email' => "student{$i}@bppi.sch",
                'password' => Hash::make('password'),
                'user_type' => 'student',
            ]);

            $studentUser->assignRole('student');

            // Parent User
            $parentUser = User::create([
                'username' => 'parent' . $i,
                'email' => "parent{$i}@bppi.sch",
                'password' => Hash::make('password'),
                'user_type' => 'parent',
            ]);

            // Parent Profile
            $parent = UserParent::create([
                'user_id' => $parentUser->id,
                'name' => $faker->name,
                'job' => $faker->jobTitle,
                'gender' => $faker->randomElement(['male', 'female']),
                'birth_place' => $faker->city,
                'birth_date' => $faker->dateTimeBetween('-50 years', '-35 years'),
                'religion' => $faker->randomElement(['Islam', 'Kristen', 'Hindu', 'Budha']),
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'relation' => $faker->randomElement(['father', 'mother', 'guardian']),
            ]);

            // Student Profile
            Student::create([
                'user_id' => $studentUser->id,
                'class_id' => $faker->randomElement($classIds),
                'major_id' => $faker->randomElement($majorIds),
                'parent_id' => $parent->id,
                'name' => $faker->name,
                'nis' => 'NIS' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'nisn' => 'NISN' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'gender' => $faker->randomElement(['male', 'female']),
                'birth_place' => $faker->city,
                'birth_date' => $faker->dateTimeBetween('-19 years', '-16 years'),
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'religion' => $faker->randomElement(['Islam', 'Kristen', 'Hindu', 'Budha']),
            ]);
        }
    }

}

