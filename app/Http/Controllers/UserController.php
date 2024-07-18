<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function profile()
    {
        // Fetch user data to be passed to the frontend
        $user = Auth::user();
        return Inertia::render('Profile', ['user' => $user]);
    }

    public function settings()
    {
        // Fetch user data to be passed to the frontend
        $user = Auth::user();
        return Inertia::render('Settings', ['user' => $user]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}