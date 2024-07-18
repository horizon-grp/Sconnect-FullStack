import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Messages = ({ conversations }) => {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-4">Messages</h1>
                <ul>
                    {conversations.map(conversation => (
                        <li key={conversation.id} className="mb-4">
                            <InertiaLink
                                href={`/messages/${conversation.id}`}
                                className="block p-4 border rounded hover:bg-gray-100"
                            >
                                <div>{conversation.provider.first_name} {conversation.provider.last_name} (Provider)</div>
                                <div>{conversation.seeker.first_name} {conversation.seeker.last_name} (Seeker)</div>
                            </InertiaLink>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
};

export default Messages;
