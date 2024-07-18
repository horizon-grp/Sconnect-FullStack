<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->redirectUser($request->user());
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return $this->redirectUser($request->user());
    }

    /**
     * Redirect the user to the appropriate dashboard based on user type.
     */
    protected function redirectUser($user): RedirectResponse
    {
        switch ($user->user_type) {
            case 'service_seeker':
                return redirect()->intended(route('serviceSeeker.dashboard', absolute: false).'?verified=1');
            case 'service_provider':
                return redirect()->intended(route('serviceProvider.dashboard', absolute: false).'?verified=1');
            case 'recruiter':
                return redirect()->intended(route('recruiter.dashboard', absolute: false).'?verified=1');
            default:
                return redirect()->intended(route('home', absolute: false).'?verified=1');
        }
    }
}
