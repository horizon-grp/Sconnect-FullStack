<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Notifications\NewBookingNotification;
use App\Notifications\BookingStatusNotification;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
        ]);

        $service = Service::findOrFail($request->service_id);

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'service_id' => $service->id,
            'status' => 'pending',
        ]);

        // Notify the service provider
        $service->user->notify(new NewBookingNotification($booking));

        return redirect()->route('service_seeker.dashboard')->with('success', 'Booking successful!');
    }

    public function accept(Request $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        $booking->status = 'accepted';
        $booking->save();

        // Notify the service seeker
        $booking->user->notify(new BookingStatusNotification($booking));

        return redirect()->route('service_provider.dashboard')->with('success', 'Booking accepted.');
    }

    public function reject(Request $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        $booking->status = 'rejected';
        $booking->save();

        // Notify the service seeker
        $booking->user->notify(new BookingStatusNotification($booking));

        return redirect()->route('service_provider.dashboard')->with('success', 'Booking rejected.');
    }

    public function pay(Request $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        // Handle payment processing (e.g., via Stripe or another payment gateway)
        // Assume payment is successful

        $booking->status = 'paid';
        $booking->save();

        return redirect()->route('service_seeker.dashboard')->with('success', 'Payment successful. Funds are held in escrow.');
    }

    public function confirmCompletion(Request $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        $booking->status = 'completed';
        $booking->save();

        // Release funds to the service provider
        $booking->service->user->balance += $booking->amount;
        $booking->service->user->save();

        return redirect()->route('service_seeker.dashboard')->with('success', 'Service completed. Funds released to provider.');
    }

    public function getBookings()
    {
        $bookings = Booking::with('service')->where('service_seeker_id', auth()->id())->get();

        return Inertia::render('BookedServices', [
            'bookings' => $bookings
        ]);
    }

    public function bookedServicesSeeker()
    {
        $bookings = Booking::with('service')->where('user_id', auth()->id())->get();
        return Inertia::render('BookedServicesSeeker', ['bookings' => $bookings]);
    }

    public function bookedServicesProvider()
    {
        $bookings = Booking::with('service')->where('provider_id', auth()->id())->get();
        return Inertia::render('BookedServicesProvider', ['bookings' => $bookings]);
    }

    // public function pay(Booking $booking)
    // {
    //     $booking->update(['status' => 'paid']);
    //     return back()->with('success', 'Payment successful');
    // }

    public function confirm(Booking $booking)
    {
        $booking->update(['status' => 'completed']);
        return back()->with('success', 'Service confirmed completed');
    }

}
