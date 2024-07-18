<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Pusher\Pusher;
use Inertia\Inertia;  

class ChatController extends Controller
{

    public function index()
    {
        $messages = Message::orderBy('created_at', 'asc')->get();
        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        return response()->json($message);
    }

    public function seeker()
    {
        return Inertia::render('ServiceSeeker/CustomerService', [
            'user' => auth()->user(),
        ]);
    }
    public function sendMessage(Request $request)
    {

        
        $message = Message::create([
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true,
            ]
        );

        $pusher->trigger('chat-channel', 'message-sent', [
            'id' => $message->id,
            'content' => $message->content,
            'user' => $message->user,
            'created_at' => $message->created_at->toDateTimeString(),
            'status' => 'sent',
        ]);

        return response()->json($message);
    }

    public function fetchMessages()
    {
        $messages = Message::with('user')->get();
        return response()->json($messages);
    }

    public function userTyping()
    {
        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true,
            ]
        );

        $pusher->trigger('chat-channel', 'user-typing', [
            'user' => auth()->user(),
        ]);

        return response()->json(['status' => 'typing']);
    }
}
