<?php

namespace App\Models\Academic;

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
        'tahun_ajaran',
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

    public function teacher()
    {
        return $this->belongsTo(Teachers::class, 'teacher_id');
    }
}
