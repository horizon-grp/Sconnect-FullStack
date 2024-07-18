<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\IDVerification;

class IDVerificationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_card_front' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id_card_back' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'selfie_with_id' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = Auth::user();

        $idVerification = new IDVerification();
        $idVerification->user_id = $user->id;
        $idVerification->id_card_front = $request->file('id_card_front')->store('id_verifications');
        $idVerification->id_card_back = $request->file('id_card_back')->store('id_verifications');
        $idVerification->selfie_with_id = $request->file('selfie_with_id')->store('id_verifications');
        $idVerification->status = 'pending';
        $idVerification->save();

        return redirect()->route('profile.show', $user->id)->with('success', 'ID Verification submitted successfully.');
    }

    public function index()
    {
        $verifications = IDVerification::with('user')->where('status', 'pending')->get();
        return view('admin.verifications.index', compact('verifications'));
    }

    public function approve(IDVerification $idVerification)
    {
        $idVerification->status = 'approved';
        $idVerification->save();

        return redirect()->back()->with('success', 'ID Verification approved successfully.');
    }

    public function reject(IDVerification $idVerification)
    {
        $idVerification->status = 'rejected';
        $idVerification->save();

        return redirect()->back()->with('success', 'ID Verification rejected successfully.');
    }
}
