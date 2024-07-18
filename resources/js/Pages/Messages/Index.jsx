import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Messages = ({ conversations = [] }) => {
    console.log('Conversations:', conversations);
    
    return (
        <AuthenticatedLayout>
            <div className="flex-1 p-6 bg-gray-200">
                <div className="flex">
                    <div className="w-1/3 p-4 bg-white rounded shadow-md neumorphic">
                        <h1 className="text-2xl font-bold mb-4">Messages</h1>
                        {conversations.length === 0 ? (
                            <div className="text-center p-6 bg-white rounded shadow-md neumorphic">
                                <p className="text-gray-600">No conversations yet.</p>
                            </div>
                        ) : (
                            <div>
                                {conversations.map(convo => (
                                    <InertiaLink
                                        key={convo.id}
                                        href={`/messages/${convo.id}`}
                                        className="flex items-center p-4 mb-2 bg-white rounded shadow-md neumorphic hover:bg-gray-100"
                                    >
                                        <img src={convo.provider.profile_pic || convo.seeker.profile_pic} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold">{convo.provider.name || convo.seeker.name}</h3>
                                            <p className="text-gray-600">{convo.latest_message}</p>
                                            <span className="text-xs text-gray-500">{new Date(convo.latest_message_time).toLocaleString()}</span>
                                        </div>
                                    </InertiaLink>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-2/3 p-4 bg-white rounded shadow-md neumorphic">
                        <p className="text-gray-600">Select a conversation to start chatting.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Messages;
