<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('ServiceSeeker/CustomerService', [
            'user' => auth()->user(),
        ]);
    }
}
