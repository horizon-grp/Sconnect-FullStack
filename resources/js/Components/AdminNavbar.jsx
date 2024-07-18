import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const AdminNavbar = () => {
    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">Admin Panel</div>
            <div>
                <Link href={route('logout')} method="post" className="text-blue-800">Logout</Link>
            </div>
        </div>
    );
};

export default AdminNavbar;
