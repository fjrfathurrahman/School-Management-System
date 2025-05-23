<?php

namespace App\Models\Academic;

use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;

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
}
