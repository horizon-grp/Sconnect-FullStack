import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const ChatInterface = ({ conversation, user }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            Inertia.post(`/messages/${conversation.id}`, { content: newMessage });
            setNewMessage('');
        }
    };

    return (
        <div className="w-full lg:w-2/3 p-4">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <div className="messages-list mb-4 h-96 overflow-y-auto">
                {conversation.messages.map(message => (
                    <div key={message.id} className={`message ${message.sender_id === user.id ? 'text-right' : 'text-left'}`}>
                        <p className="font-bold">{message.sender.first_name} {message.sender.last_name}</p>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className="send-message">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="border rounded w-full p-2 mb-4"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
