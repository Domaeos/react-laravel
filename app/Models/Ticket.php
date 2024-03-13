<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'support_id',
        'thread_id',
        'client_id',
        'resolved',
        'closed',
        'read'
    ];
    function clientUser() {
        return $this->hasOne(User::class, 'client_id');
    }
    
    function supportUser() {
        return $this->hasOne(User::class, 'support_id');
    }
}
