<?php

namespace App\Models\User;

use App\Models\Academic\HomeroomTeacher;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;



class Teachers extends Model
{
    protected $table = 'teachers';

    protected $fillable = [
        'user_id',

        'nip',
        'name',
        'phone_number',
        'address',
        'entry_date',
        'date_of_birth',
        'place_of_birth',
        'education',
        'position',
        'status',
        'gender',
        'avatar'
    ];


    /**
     * 1 Teacher have 1 user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Teachers>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the teacher record with all its relationships loaded.
     * 
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFullRelationship($query)
    {
        return $query->with('user');
    }

    public function homeroomAssignments()
    {

        return $this->hasMany(HomeroomTeacher::class);
    }
}
