<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'service_seeker_id',
        'service_provider_id',
        'amount',
        'status'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function serviceSeeker()
    {
        return $this->belongsTo(User::class, 'service_seeker_id');
    }

    public function serviceProvider()
    {
        return $this->belongsTo(User::class, 'service_provider_id');
    }
}
