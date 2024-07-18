import React from 'react';
import AdminSidebar from '@/Components/AdminSidebar';
import AdminNavbar from '@/Components/AdminNavbar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-200">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <AdminNavbar />
                <main className="flex-1 p-6 bg-white overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
