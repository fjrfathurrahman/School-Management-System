<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superadmin = User::create([
            'username' => 'superadmin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => 'superadmin',
        ]);

        $superadmin->assignRole('superadmin');

        $operator = User::create([
            'username' => 'operator',
            'email' => 'operator@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => 'operator',
        ]);

        $operator->assignRole('operator');
    }
}
