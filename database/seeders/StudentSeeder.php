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
        $class = Classes::first();
        $major = Major::first();

        for ($i = 1; $i <= 25; $i++) {
            // Student User
            $studentUser = User::create([
                'username' => 'student' . $i,
                'email' => "student{$i}@example.com",
                'password' => Hash::make('password'),
                'user_type' => 'student',
            ]);

            $studentUser->assignRole('student');

            // Parent User
            $parentUser = User::create([
                'username' => 'parent' . $i,
                'email' => "parent{$i}@example.com",
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
                'religion' => 'Islam',
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'avatar' => 'default.png',
                'relation' => 'father',
            ]);

            // Student Profile
            Student::create([
                'user_id' => $studentUser->id,
                'class_id' => $class->id,
                'major_id' => $major->id,
                'parent_id' => $parent->id,
                'name' => $faker->name,
                'nis' => 'NIS' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'nisn' => 'NISN' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'gender' => $faker->randomElement(['male', 'female']),
                'birth_place' => $faker->city,
                'birth_date' => $faker->dateTimeBetween('-19 years', '-16 years'),
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'religion' => 'Islam',
                'avatar' => null,
            ]);
        }
    }
}

