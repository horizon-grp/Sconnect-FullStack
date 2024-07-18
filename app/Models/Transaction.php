<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_provider_id', 'service_seeker_id', 'service_id', 'amount', 'status',
    ];

    public function serviceProvider()
    {
        return $this->belongsTo(User::class, 'service_provider_id');
    }

    public function serviceSeeker()
    {
        return $this->belongsTo(User::class, 'service_seeker_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
