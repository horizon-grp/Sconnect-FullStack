<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if ($user && $user->isAdmin()) {
            return $next($request);
        }

        return redirect('/'); // Rediriger si l'utilisateur n'est pas administrateur
    }

}
