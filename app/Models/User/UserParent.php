<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserParent extends Model
{
    
    protected $table = 'parents';
     protected $fillable = [
        'user_id',
        'name',
        'job',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'phone',
        'address',
        'avatar',
        'relation',
    ];

    
    /**
     * 1 Parent have 1 user
    */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
