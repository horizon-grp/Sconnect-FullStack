<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportsController extends Controller
{
    public function index()
    {
        $reports = Report::with('user')->get();
        return inertia('Reports/Index', [
            'reports' => $reports,
            'flash' => session('flash'), 
        ]);
    }

    public function seeker()
    {
        $reports = Report::with('user')->get();
        return inertia('ServiceSeeker/Reports', [
            'reports' => $reports,
            'flash' => session('flash'), 
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate(['content' => 'required|string']);

        // Create the report
        Report::create([
            'content' => $request->input('content'), 
            'user_id' => auth()->id(), 
        ]);

        return redirect()->route('reports.index')->with('flash', ['success' => 'Report submitted successfully.']);
    }
}
