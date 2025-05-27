<?php

namespace App\Models\Academic;

use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use App\Models\Academic\HomeroomTeacher;


class Classes extends Model
{
    protected $table = 'classes';
    protected $fillable = [
        'name',
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function major()
    {
        return $this->belongsTo(Major::class);
    }
    
    public function majorClasses()
    {
        return $this->hasMany(HomeroomTeacher::class);
    }
    
}
