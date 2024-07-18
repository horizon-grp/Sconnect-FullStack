<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function edit(Request $request)
    {
        return inertia('Settings', [
            'user' => $request->user(),
        ]);
    }

    public function get(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'language' => $user->settings->language ?? 'en',
            'theme' => $user->settings->theme ?? 'light',
            'notifications' => $user->settings->notifications ?? true,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->only('language', 'theme', 'notifications');

        $validator = Validator::make($data, [
            'language' => 'required|string|in:en,es,fr,de', // Add other languages as needed
            'theme' => 'required|string|in:light,dark',
            'notifications' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user->settings()->updateOrCreate([], $data);

        return redirect()->route('settings.edit')->with('success', 'Settings updated successfully.');
    }
}