<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Admin/Services', ['services' => $services]);
    }

    public function create()
    {
        return Inertia::render('Admin/CreateService');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required|numeric',
            'location' => 'required',
            'image' => 'required',
            'description' => 'required',
        ]);

        Service::create($request->all());

        return redirect()->route('admin.services.index');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/EditService', ['service' => $service]);
    }

    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required|numeric',
            'location' => 'required',
            'image' => 'required',
            'description' => 'required',
        ]);

        $service->update($request->all());

        return redirect()->route('admin.services.index');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index');
    }
}
