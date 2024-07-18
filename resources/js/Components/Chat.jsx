import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';

const Chat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messageEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();

        const pusher = new Pusher('e8afa4289dfb7cf58213', {
            cluster: 'mt1',
        });

        const channel = pusher.subscribe('chat-channel');
        channel.bind('message-sent', function (message) {
            setMessages(prevMessages => [...prevMessages, message]);
            scrollToBottom();
        });

        channel.bind('user-typing', function (data) {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 3000);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const fetchMessages = async () => {
        const response = await fetch('/chat/messages');
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: messageContent }),
        });

        const message = await response.json();
        setMessages(prevMessages => [...prevMessages, message]);
        setMessageContent('');
        scrollToBottom();
    };

    const handleTyping = async () => {
        await fetch('/chat/typing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (messageContent) {
            handleTyping();
        }
    }, [messageContent]);

    useEffect(() => {
        const sendGreeting = async () => {
            const response = await fetch('/chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: 'Hello! How can I assist you today? 😊' }),
            });

            const greetingMessage = await response.json();
            setMessages(prevMessages => [...prevMessages, greetingMessage]);
            scrollToBottom();
        };

        sendGreeting();
    }, []);

    return (
        <div className="chat-container flex flex-col h-full">
            <div className="messages flex-1 overflow-y-auto p-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message flex items-start ${msg.user.id === user.id ? 'justify-end' : 'justify-start'}`}>
                        {msg.user.id !== user.id && (
                            <img src={msg.user.profile_picture || '/default-avatar.png'} alt={msg.user.name} className="w-8 h-8 rounded-full mr-2" />
                        )}
                        <div className="message-content p-2 rounded-lg shadow bg-white">
                            <p className="mb-1"><strong>{msg.user.name}</strong></p>
                            <p className="text-sm">{msg.content}</p>
                            <small className="text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</small>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="typing-indicator text-gray-500">
                        Someone is typing...
                    </div>
                )}
                <div ref={messageEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-300">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded mr-2"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Send</button>
            </form>
        </div>
    );
};

export default Chat;
