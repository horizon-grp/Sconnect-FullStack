<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{

    use HasFactory;

    // protected $fillable = ['provider_id', 'seeker_id'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class)->latest();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function seeker()
    {
        return $this->belongsTo(User::class, 'seeker_id');
    }
}
