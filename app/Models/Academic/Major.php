<?php

namespace App\Models\Academic;

use Illuminate\Database\Eloquent\Model;

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
}
