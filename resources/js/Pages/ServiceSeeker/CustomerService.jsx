// resources/js/Pages/ServiceSeeker/CustomerService.jsx

import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chat from '@/Components/Chat';

const CustomerService = ({ user }) => {
    const [status, setStatus] = useState('Online');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Simulate fetching chat history
        const fetchMessages = async () => {
            const response = await fetch('/api/chat/messages'); // Adjust the endpoint as needed
            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100 h-screen flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Customer Service</h1>
                <div className="flex items-center mb-4">
                    <span className={`status-dot bg-${status === 'Online' ? 'green' : 'red'}-500 inline-block w-2 h-2 rounded-full mr-2`}></span>
                    <span className="text-gray-700">{status}</span>
                </div>
                <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-4 mb-4">
                    <Chat user={user} messages={messages} />
                </div>
                <div className="flex-none">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CustomerService;
