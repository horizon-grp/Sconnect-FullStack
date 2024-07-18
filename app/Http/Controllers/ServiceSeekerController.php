<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Payment;

class ServiceSeekerController extends Controller
{
    // public function index(): Response
    // {
    //     $services = Service::all();
    //     return Inertia::render('ServiceSeeker/Dashboard', [
    //         'services' => $services,
    //         'user' => auth()->user(),
    //     ]);
    // }

    public function dashboard()
    {

        $services = Service::all();

        return Inertia::render('ServiceSeeker/Dashboard', [
            'services' => $services,
            'user' => auth()->user(),
        ]);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    public function appointments()
    {
        $appointments = Appointment::where('service_seeker_id', auth()->id())->with(['serviceProvider', 'service'])->get();
        return Inertia::render('ServiceSeeker/Appointments', ['appointments' => $appointments]);
    }

    public function payments()
    {
        $payments = Payment::where('service_seeker_id', auth()->id())->with(['appointment.serviceProvider', 'appointment.service'])->get();
        return Inertia::render('ServiceSeeker/Payments', ['payments' => $payments]);
    }
}
