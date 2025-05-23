<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User\Student;
use App\Models\User\UserParent;
use App\Models\Academic\Classes;
use App\Models\Academic\Major;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $class = Classes::first();
        $major = Major::first();

        for ($i = 1; $i <= 20; $i++) {
            // Buat User untuk Student
            $user = User::create([
                'username'   => 'student' . $i,
                'email'      => 'student' . $i . '@example.com',
                'password'   => Hash::make('password'),
                'user_type'  => 'student',
            ]);

            // Buat User untuk Parent
            $parent = User::create([
                'username'   => 'parent' . $i,
                'email'      => 'parent' . $i . '@example.com',
                'password'   => Hash::make('password'),
                'user_type'  => 'parent',
            ]);

            $user->assignRole('student');

            // Buat UserParent
            $parent = UserParent::create([
                'user_id'     => $parent->id, // jika belum ada user login khusus parent
                'name'        => 'Orang Tua ' . $i,
                'job'         => 'Wiraswasta',
                'gender'      => $i % 2 == 0 ? 'male' : 'female',
                'birth_place' => 'Kota ' . $i,
                'birth_date'  => now()->subYears(40)->subDays($i),
                'religion'    => 'Islam',
                'phone'       => '0813' . rand(10000000, 99999999),
                'address'     => 'Jl. Alamat Orang Tua ' . $i,
                'avatar'      => 'default.png',
                'relation'    => 'father',
            ]);

            // Buat Student
            Student::create([
                'user_id'     => $user->id,
                'class_id'    => $class->id,
                'major_id'    => $major->id,
                'parent_id'   => $parent->id,
                'name'        => 'Siswa ' . $i,
                'nis'         => 'NIS' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'nisn'        => 'NISN' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'gender'      => $i % 2 == 0 ? 'male' : 'female',
                'birth_place' => 'Kota ' . $i,
                'birth_date'  => now()->subYears(17)->subDays($i),
                'phone'       => '0821' . rand(10000000, 99999999),
                'address'     => 'Alamat Siswa ' . $i,
                'religion'    => 'Islam',
                'avatar'      => null ,
            ]);
        }
    }
}
