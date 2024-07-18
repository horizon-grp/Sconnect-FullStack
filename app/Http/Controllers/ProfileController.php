<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return inertia('Profile/Show', ['profile' => $user]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id_card_front' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id_card_back' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'selfie_with_id' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $data = $request->only('first_name', 'last_name', 'email', 'phone', 'address', 'bio');

        if ($request->hasFile('profile_picture')) {
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures');
        }

        if ($request->hasFile('id_card_front')) {
            $data['id_card_front'] = $request->file('id_card_front')->store('id_verifications');
        }

        if ($request->hasFile('id_card_back')) {
            $data['id_card_back'] = $request->file('id_card_back')->store('id_verifications');
        }

        if ($request->hasFile('selfie_with_id')) {
            $data['selfie_with_id'] = $request->file('selfie_with_id')->store('id_verifications');
        }

        if ($request->hasFile('resume')) {
            $data['resume'] = $request->file('resume')->store('resumes');
        }

        $user->update($data);

        return redirect()->route('profile.show', $user->id)->with('success', 'Profile updated successfully.');
    }

    
}
