<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'email', 'phone', 'address', 'bio', 'profile_picture', 'id_card_front', 'id_card_back', 'id_card_selfie', 'resume'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
