<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('user_id', auth()->id())->get();
        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'location' => 'required|string|in:remote,onsite',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $service = new Service();
        $service->user_id = auth()->id();
        $service->name = $request->name;
        $service->category = $request->category;
        $service->price = $request->price;
        $service->description = $request->description;
        $service->location = $request->location;

        if ($request->hasFile('image')) {
            $service->image = $request->file('image')->store('services');
        }

        $service->save();

        return redirect()->back()->with('success', 'Service created successfully.');
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'location' => 'required|string|in:remote,onsite',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $service->name = $request->name;
        $service->category = $request->category;
        $service->price = $request->price;
        $service->description = $request->description;
        $service->location = $request->location;

        if ($request->hasFile('image')) {
            // Delete old image
            if ($service->image) {
                Storage::delete($service->image);
            }
            $service->image = $request->file('image')->store('services');
        }

        $service->save();

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        // Delete image
        if ($service->image) {
            Storage::delete($service->image);
        }

        $service->delete();

        return redirect()->back()->with('success', 'Service deleted successfully.');
    }
}
