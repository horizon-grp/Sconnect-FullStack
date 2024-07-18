// resources/js/Pages/ServiceProvider/ClientList.jsx
import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { FaEnvelope } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ClientList = ({ clients }) => {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Client List</h1>
                {clients.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-xl">No clients yet.</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clients.map((client, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 glassmorphic">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={client.profile_pic || '/images/default-profile.png'}
                                        alt={client.name}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold">{client.name}</h3>
                                        <p className="text-gray-600">{client.date_booked}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Link
                                        href={`/messages/${client.id}`}
                                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
                                    >
                                        <FaEnvelope />
                                        <span>Send Message</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default ClientList;
