<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Inertia\Inertia;
use App\Models\Service;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with('service', 'serviceProvider')->where('service_seeker_id', auth()->id())->get();
        
        return Inertia::render('Appointments', [
            'appointments' => $appointments,
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $service = Service::find($request->service_id);

        $appointment = Appointment::create([
            'service_seeker_id' => auth()->id(),
            'service_provider_id' => $service->user_id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending',
        ]);

        // Notify the service provider about the new appointment
        $service->user->notify(new NewAppointmentNotification($appointment));

        return redirect()->route('service_seeker.dashboard')->with('success', 'Appointment request submitted successfully!');
    }

    public function updateStatus(Request $request, $appointmentId)
    {
        $appointment = Appointment::findOrFail($appointmentId);

        $request->validate([
            'status' => 'required|in:confirmed,canceled,completed',
        ]);

        $appointment->status = $request->status;
        $appointment->save();

        // Notify the service seeker about the appointment status update
        $appointment->serviceSeeker->notify(new AppointmentStatusNotification($appointment));

        return redirect()->route('service_provider.dashboard')->with('success', 'Appointment status updated.');
    }

    public function complete(Request $request, $appointmentId)
    {
        $appointment = Appointment::findOrFail($appointmentId);
        $appointment->status = 'completed';
        $appointment->save();

        // Release funds from escrow to service provider
        $serviceProvider = $appointment->serviceProvider;
        $serviceProvider->balance += $appointment->service->price;
        $serviceProvider->save();

        // Notify the service seeker about the completion
        $appointment->serviceSeeker->notify(new AppointmentCompletionNotification($appointment));

        return redirect()->route('service_seeker.dashboard')->with('success', 'Appointment marked as completed and funds released.');
    }

    public function cancel(Request $request, $appointmentId)
    {
        $appointment = Appointment::findOrFail($appointmentId);
        $appointment->status = 'canceled';
        $appointment->save();

        // Refund the funds to the service seeker
        $serviceSeeker = $appointment->serviceSeeker;
        $serviceSeeker->balance += $appointment->service->price;  // Adjust this based on your payment/escrow logic
        $serviceSeeker->save();

        // Notify the service provider about the cancellation
        $appointment->serviceProvider->notify(new AppointmentCancellationNotification($appointment));

        return redirect()->route('service_seeker.dashboard')->with('success', 'Appointment canceled and funds refunded.');
    }
}
