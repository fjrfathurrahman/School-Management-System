<?php

namespace App\Models\Academic;

use Illuminate\Database\Eloquent\Model;
use App\Models\Academic\HomeroomTeacher;

class Major extends Model
{
    protected $table = 'majors';
    protected $fillable = [
        'name',
        'slug',
        'description',
        'short'
    ];

    public function classes()
    {
        return $this->hasMany(Classes::class);
    }

    public function majorClasses()
    {
        return $this->hasMany(HomeroomTeacher::class);
    }
}
