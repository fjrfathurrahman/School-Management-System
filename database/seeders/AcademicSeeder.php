<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Academic\Classes;
use App\Models\Academic\Major;


class AcademicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data kelas
        $classes = ['X', 'XI', 'XII'];

        foreach ($classes as $class) {
            Classes::firstOrCreate(['name' => $class]);
        }

        // Data jurusan + deskripsi
        $majors = [
            [
                'name' => 'Rekayasa Perangkat Lunak',
                'description' => 'Jurusan yang fokus pada pengembangan perangkat lunak dan aplikasi berbasis web maupun mobile.'
            ],
            [
                'name' => 'Teknik Jaringan Komputer',
                'description' => 'Jurusan yang mempelajari tentang instalasi, konfigurasi, dan pemeliharaan jaringan komputer.'
            ],
            [
                'name' => 'Akuntansi Keuangan',
                'description' => 'Jurusan yang membekali siswa dengan kemampuan dalam pencatatan, pelaporan, dan analisis keuangan.'
            ]
        ];

        foreach ($majors as $major) {
            Major::firstOrCreate([
                'name' => $major['name'],
                'slug' => Str::slug($major['name']),
                'description' => $major['description']
            ]);
        }
    }
}
