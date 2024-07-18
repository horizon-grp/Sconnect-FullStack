import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-blue-800 text-white flex flex-col">
            <div className="px-6 py-4 text-2xl font-bold">Admin Panel</div>
            <nav className="flex flex-col px-6 py-4">
                <Link href={route('admin.dashboard')} className="mb-2">Dashboard</Link>
                <Link href={route('admin.users.index')} className="mb-2">Users</Link>
                <Link href={route('admin.bookings.index')} className="mb-2">Bookings</Link>
                <Link href={route('admin.appointments.index')} className="mb-2">Appointments</Link>
                <Link href={route('admin.reports.index')} className="mb-2">Reports</Link>
            </nav>
        </div>
    );
};

export default AdminSidebar;
