<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;

class ServiceProviderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('ServiceProvider/Dashboard');
    }

    public function clients()
    {
        $serviceProviderId = Auth::id();

        // Fetch clients who have booked services from this service provider
        $clients = User::whereHas('bookings', function($query) use ($serviceProviderId) {
            $query->where('user_id', $serviceProviderId);
        })->get();

        return Inertia::render('ServiceProvider/ClientList', [
            'clients' => $clients,
        ]);
    }

    // ProviderController.php

public function bookings()
{
    $bookings = Booking::where('user_id', auth()->id())->get(); 
    return Inertia::render('ServiceProvider/Bookings', ['bookings' => $bookings]);
}

}
