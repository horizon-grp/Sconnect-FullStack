<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class RecruiterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Recruiter/Dashboard');
    }
}
