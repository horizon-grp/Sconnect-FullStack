<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction;

class MobileMoneyController extends Controller
{
    private $mtnApiUrl = 'https://sandbox.mtn.com/'; // Replace with MTN sandbox API URL
    private $mtnApiKey = 'your_sandbox_mtn_api_key';

    public function createPayment(Request $request)
    {
        $amount = $request->input('amount');

        // Request payload for MTN Mobile Money
        $payload = [
            'amount' => $amount,
            'currency' => 'XOF', // Adjust as necessary
            'phone_number' => $request->input('phone_number'),
            'callback_url' => route('payment.callback'),
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->mtnApiKey,
        ])->post($this->mtnApiUrl . '/payment', $payload);

        $responseData = $response->json();

        return response()->json($responseData);
    }

    public function callback(Request $request)
    {
        // Handle callback from MTN Mobile Money
        $transactionId = $request->input('transaction_id');
        $status = $request->input('status');
        
        // Update transaction status in the database
        $transaction = Transaction::where('id', $transactionId)->first();
        $transaction->status = $status;
        $transaction->save();

        return response()->json(['status' => 'success']);
    }
}
