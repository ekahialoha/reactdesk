<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use SoftDeletes;

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }
}
