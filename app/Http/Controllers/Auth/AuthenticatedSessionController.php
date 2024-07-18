<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return $this->redirectUser($request->user());
    }

    protected function redirectUser($user): RedirectResponse
    {
        switch ($user->user_type) {
            case 'service_seeker':
                return redirect()->intended(route('serviceSeeker.dashboard'));
            case 'service_provider':
                return redirect()->intended(route('serviceProvider.dashboard'));
            case 'recruiter':
                return redirect()->intended(route('recruiter.dashboard'));
            default:
                // Optionally, you can log this case for further debugging or show an error message
                Auth::logout();
                return redirect('/login')->withErrors(['error' => 'Unauthorized user type. Please contact support.']);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
