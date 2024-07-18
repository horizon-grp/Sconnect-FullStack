<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Stripe\Stripe;
use Stripe\Charge;
use App\Models\Transaction;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Appointment;

class PaymentController extends Controller
{
    private $mtnApiUrl = 'https://sandbox.mtn.com/'; // MTN sandbox URL
    private $mtnApiKey = 'your_sandbox_mtn_api_key';
    private $orangeApiUrl = 'https://sandbox.orange.com/'; // Orange sandbox URL
    private $orangeApiKey = 'your_sandbox_orange_api_key';

    public function index()
    {
        $payments = Payment::with('appointment.service', 'appointment.serviceProvider')
            ->where('service_seeker_id', auth()->id())
            ->get();

        return Inertia::render('ServiceSeeker/Payments', [
            'payments' => $payments
        ]);
    }

    public function submitPayment(Request $request)
    {
        $paymentMethod = $request->input('payment_method');
        $amount = $request->input('amount');
        $phoneNumber = $request->input('phone_number');

        switch ($paymentMethod) {
            case 'mtn':
                return $this->processMtnPayment($amount, $phoneNumber);
            case 'orange':
                return $this->processOrangePayment($amount, $phoneNumber);
            case 'stripe':
                return response()->json(['status' => 'success']);
            default:
                return response()->json(['error' => 'Invalid payment method'], 400);
        }
    }

    private function processMtnPayment($amount, $phoneNumber)
    {
        $payload = [
            'amount' => $amount,
            'currency' => 'XOF',
            'phone_number' => $phoneNumber,
            'callback_url' => route('payment.callback'),
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->mtnApiKey,
        ])->post($this->mtnApiUrl . '/payment', $payload);

        $responseData = $response->json();

        return response()->json($responseData);
    }

    private function processOrangePayment($amount, $phoneNumber)
    {
        $payload = [
            'amount' => $amount,
            'currency' => 'XOF',
            'phone_number' => $phoneNumber,
            'callback_url' => route('payment.callback'),
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->orangeApiKey,
        ])->post($this->orangeApiUrl . '/payment', $payload);

        $responseData = $response->json();

        return response()->json($responseData);
    }

    public function stripePayment(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $charge = Charge::create([
                'amount' => $request->input('amount') * 100, // Amount in cents
                'currency' => 'usd',
                'source' => $request->input('stripeToken'),
                'description' => 'Payment for service',
            ]);

            // Save transaction details in the database
            $transaction = new Transaction();
            $transaction->amount = $request->input('amount');
            $transaction->status = 'completed';
            $transaction->save();

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'amount' => 'required|numeric|min:0',
        ]);

        $appointment = Appointment::findOrFail($request->appointment_id);

        $payment = Payment::create([
            'appointment_id' => $appointment->id,
            'service_seeker_id' => auth()->id(),
            'service_provider_id' => $appointment->service_provider_id,
            'amount' => $request->amount,
            'status' => 'pending',
        ]);

        return response()->json(['status' => 'success']);
    }
}
