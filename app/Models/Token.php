<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Token extends Model
{
    use HasFactory;
    public $table = "tokens";

    function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
