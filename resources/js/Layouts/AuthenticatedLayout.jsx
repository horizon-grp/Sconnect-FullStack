import React from 'react';
import AuthNavbar from '@/Components/AuthNavbar';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const { url } = usePage();

    return (
        <div className="flex h-screen">
            <Sidebar currentUrl={url} />
            
            <div className="flex flex-col flex-1 bg-gray-100 relative">
                <AuthNavbar user={user} className="absolute w-full z-10" />
                
                {header && (
                    <header className="bg-white shadow mt-16">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}
                <main className="flex-1 overflow-y-auto p-6 mt-2">
                    {children}
                </main>
            </div>
        </div>
    );
}
