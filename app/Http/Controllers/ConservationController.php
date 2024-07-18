<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Message;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = Conversation::where('user_id', auth()->id())->get();
        return Inertia::render('Messages', ['conversations' => $conversations]);
    }

    public function show(Conversation $conversation)
    {
        $messages = Message::where('conversation_id', $conversation->id)->get();
        return response()->json($messages);
    }
    }

