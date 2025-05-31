<?php

namespace App\Models\Academic;
use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use App\Models\Academic\Classes;
use App\Models\Academic\Major;
use App\Models\User\Teachers;


class HomeroomTeacher extends Model
{

    /**
     * The homeroom teacher belongs to a class, major, and teacher.
     * It also has an academic year and a semester.
     */
    protected $fillable = [
        'classes_id',
        'major_id',
        'teacher_id',
        'school_year',
        'semester',
    ];

    public function class()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }

    public function major()
    {
        return $this->belongsTo(Major::class, 'major_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'class_id', 'classes_id');
    }

    /**
     * Get the homeroom teacher record with all its relationships loaded.
     * 
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */

    public function scopeFullRelationship($query)
    {
        return $query->with(['class', 'major', 'teacher'])->withCount('students');
    }

    public function teacher()
    {
        return $this->belongsTo(Teachers::class, 'teacher_id');
    }
}
