<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            $user = Auth::user();

            switch ($user->user_type) {
                case 'service_seeker':
                    return redirect()->route('serviceSeeker.dashboard');
                case 'service_provider':
                    return redirect()->route('serviceProvider.dashboard');
                case 'recruiter':
                    return redirect()->route('recruiter.dashboard');
                default:
                    Auth::logout();
                    return redirect('/login')->withErrors(['error' => 'Unauthorized user type. Please contact support.']);
            }
        }

        return $next($request);
    }
}
