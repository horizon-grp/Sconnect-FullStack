<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IDVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'id_card_front', 'id_card_back', 'id_card_selfie'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
