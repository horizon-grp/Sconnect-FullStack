<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_type' => ['required', 'string'],
            'agree_to_terms' => ['accepted'],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'user_type' => $request->user_type,
        ]);

        event(new Registered($user));

        Auth::login($user);

        $dashboardRoute = $this->getDashboardRoute($user->user_type);

        return redirect()->route($dashboardRoute);
    }


    protected function getDashboardRoute(string $userType): string
{
    switch ($userType) {
        case 'service_seeker':
            return 'serviceSeeker.dashboard';
        case 'service_provider':
            return 'serviceProvider.dashboard';
        case 'recruiter':
            return 'recruiter.dashboard';
        default:
            return 'login';
    }
}

}