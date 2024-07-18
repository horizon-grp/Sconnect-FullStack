import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Messages = ({ conversations = [] }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (selectedConversation) {
            axios.get(`/conversations/${selectedConversation.id}`)
                .then(response => setMessages(response.data));
        }
    }, [selectedConversation]);

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };

    const handleSendMessage = () => {
        axios.post(`/conversations/${selectedConversation.id}/messages`, {
            content: newMessage,
        }).then(response => {
            setMessages([...messages, response.data]);
            setNewMessage('');
        });
    };

    return (
        <AuthenticatedLayout>
        <div className="flex h-screen">
            <div className="w-1/3 bg-white border-r border-gray-200 p-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className={`flex items-center p-2 mb-2 cursor-pointer rounded-lg ${selectedConversation && selectedConversation.id === conversation.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            onClick={() => handleConversationClick(conversation)}
                        >
                            <div>
                                <div className="font-bold text-gray-800">{conversation.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-2/3 flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <div>
                                <div className="font-bold text-gray-800">{selectedConversation.title}</div>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className="mb-4">
                                    <div className="flex items-end mb-2">
                                        <div className="text-gray-600">{msg.content}</div>
                                        <div className="text-gray-400 text-sm ml-2">{msg.created_at}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-200 flex items-center">
                            <input
                                type="text"
                                placeholder="Message"
                                className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={handleSendMessage}>
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center flex-1">
                        <div className="text-gray-500">Select a conversation to start</div>
                    </div>
                )}
            </div>
        </div>
        </AuthenticatedLayout>
    );
};

export default Messages;
