<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\IDVerification;
use Illuminate\Http\Request;
use Inertia\Inertia;


class VerificationController extends Controller
{
    public function index()
    {
        $verifications = IDVerification::with('user')->get();
        return Inertia::render('Admin/Verifications', ['verifications' => $verifications]);
    }

    public function approve(IDVerification $verification)
    {
        $verification->update(['status' => 'approved']);
        return redirect()->route('admin.verifications.index')->with('success', 'Verification approved successfully.');
    }

    public function reject(IDVerification $verification)
    {
        $verification->update(['status' => 'rejected']);
        return redirect()->route('admin.verifications.index')->with('success', 'Verification rejected successfully.');
    }
}
