import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chat from '@/Components/Chat';

const CustomerService = ({ user }) => {
    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-200 h-screen flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Customer Service</h1>
                <div className="status mb-2">
                    <span className="status-dot bg-green-500 inline-block w-2 h-2 rounded-full mr-2"></span>
                    <span className="text-gray-700">Online</span>
                </div>
                <Chat user={user} />
            </div>
        </AuthenticatedLayout>
    );
};

export default CustomerService;
