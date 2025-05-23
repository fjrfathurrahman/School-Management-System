<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['super_admin', 'admin', 'operator', 'teacher', 'student', 'parent'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $permissions = [
            'manage students',
            'manage teachers',
            'manage classes',
            'manage majors',
            'manage users',
            'import/export students',
            'import/export teachers',
            'import/export attendances',
            'approve permissions',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        Role::findByName('super_admin')->givePermissionTo(Permission::all());
        Role::findByName('teacher')->givePermissionTo(['manage students', 'import/export attendances', 'approve permissions']);
        Role::findByName('operator')->givePermissionTo(['manage classes', 'manage majors', 'manage users', 'import/export students', 'import/export teachers', 'import/export attendances', 'approve permissions']);
    }
}
