<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $transactions = $user->transactions()->with(['serviceProvider', 'service'])->get();

        return Inertia::render('Transactions', [
            'transactions' => $transactions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_provider_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'amount' => 'required|numeric|min:0',
        ]);

        $transaction = Transaction::create([
            'service_provider_id' => $request->service_provider_id,
            'service_seeker_id' => Auth::id(),
            'service_id' => $request->service_id,
            'amount' => $request->amount,
            'status' => 'in_escrow',
        ]);

        // Logic to handle actual payment and escrow can be implemented here

        return redirect()->route('transactions.index')->with('success', 'Transaction created and amount placed in escrow.');
    }

    public function release(Transaction $transaction)
    {
        $transaction->update(['status' => 'completed']);

        // Logic to release funds to the service provider can be implemented here

        return redirect()->route('transactions.index')->with('success', 'Funds released to service provider.');
    }

    public function cancel(Transaction $transaction)
    {
        $transaction->update(['status' => 'canceled']);

        // Logic to refund the service seeker can be implemented here

        return redirect()->route('transactions.index')->with('success', 'Transaction canceled and funds refunded.');
    }
}
