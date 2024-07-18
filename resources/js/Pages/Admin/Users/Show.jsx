import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const ShowUser = ({ user }) => {
    return (
        <AdminLayout>
            <div>
                <h2 className="text-2xl font-bold">User Details</h2>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User Type:</strong> {user.user_type}</p>
                <p><strong>Email Verified At:</strong> {user.email_verified_at}</p>
                <p><strong>Created At:</strong> {user.created_at}</p>
                <p><strong>Updated At:</strong> {user.updated_at}</p>
            </div>
        </AdminLayout>
    );
};

export default ShowUser;
