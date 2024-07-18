<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientProfileController extends Controller
{
    public function show()
    {
        // Assuming you have user data
        return Inertia::render('Profile', [
            'user' => auth()->user()
        ]);
    }

   // Dans ClientProfileController.php
public function update(Request $request, $id)
{
    $client = Client::find($id);
    if ($client) {
        $client->update($request->all());
        return response()->json(['message' => 'Profile updated successfully.']);
    } else {
        return response()->json(['message' => 'Client not found.'], 404);
    }
}

}
