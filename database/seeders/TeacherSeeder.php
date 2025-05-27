<?php

namespace Database\Seeders;

use App\Models\User\Teachers;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User\Student;
use App\Models\User\UserParent;
use App\Models\Academic\Classes;
use App\Models\Academic\Major;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create('id_ID');

        for ($i = 0; $i < 15; $i++) {
            // Teacher User
            $teacherUser = User::create([
                'username' => 'teacher' . $i,
                'email' => "teacher{$i}@bppi.sch",
                'password' => Hash::make('password'),
                'user_type' => 'teacher',
            ]);

            $teacherUser->assignRole('teacher');

            // Teacher Profile
            Teachers::create([
                'user_id' => $teacherUser->id,
                'nip' => $faker->numberBetween(1000000, 9999999),
                'name' => $faker->name,
                'phone_number' => $faker->phoneNumber,
                'address' => $faker->address,
                'entry_date' => $faker->dateTimeBetween('-10 years', 'now'),
                'date_of_birth' => $faker->dateTimeBetween('-50 years', '-20 years'),
                'place_of_birth' => $faker->city,
                'education' => $faker->randomElement(['S1 Pendidikan', 'S2 Ilmu Komputer', 'S3 Pertanian']),
                'position' => $faker->randomElement(['Guru', 'Kepala Sekolah', 'Wakil Kepala Sekolah']),
                'status' => $faker->randomElement(['aktif', 'nonaktif']),
                'gender' => $faker->randomElement(['male', 'female']),
                'avatar' => $faker->imageUrl(640, 480, 'people')
            ]);
        }
    }
}
