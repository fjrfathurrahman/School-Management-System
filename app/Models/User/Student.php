<?php

namespace App\Models\User;

use App\Models\Academic\Classes;
use App\Models\Academic\Major;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';
    protected $fillable = [
        'user_id',
        'class_id',
        'major_id',
        'parent_id',

        'name',
        'nis',
        'nisn',
        'gender',
        'birth_place',
        'birth_date',
        'phone',
        'address',
        'religion',
        'avatar',
    ];

    
    /**
     * 1 Student have 1 user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, User\Student>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 1 Student have 1 parent
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User\UserParent, User\Student>
     */
    public function parent()
    {
        return $this->belongsTo(UserParent::class);
    }

    /**
     * 1 Student have 1 Class (X, XI, XII)
     */
    public function class()
    {
        return $this->belongsTo(Classes::class);
    }

    /**
     * 1 Student have 1 Major (RPL/TKJ)
     */
    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    /**
     * Get the student record with all its relationships loaded.
     * 
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFullRelationship($query)
    {
        return $query->with(['user', 'class', 'major', 'parent']);
    }

    /**
     * Get the gender attribute in a readable format.
     *
     * @param  string  $value
     * @return string
     */
    public function getGenderAttribute($value)
    {
        return $value == 'male' ? 'Laki-laki' : 'Perempuan';
    }
}
