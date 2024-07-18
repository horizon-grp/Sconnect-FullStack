<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Booking;

class ClientController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Ensure the user is a service provider
        if ($user->user_type !== 'service_provider') {
            return redirect()->route('home')->withErrors(['error' => 'Unauthorized access']);
        }

        // Fetch all bookings for the services provided by the user
        $clients = Booking::with('serviceSeeker')
            ->where('service_provider_id', $user->id)
            ->get()
            ->map(function ($booking) {
                return [
                    'name' => $booking->serviceSeeker->name,
                    'profile_pic' => $booking->serviceSeeker->profile_pic,
                    'date_booked' => $booking->created_at->toDateString(),
                ];
            });

        return Inertia::render('ServiceProvider/ClientList', [
            'clients' => $clients,
        ]);
    }
}
