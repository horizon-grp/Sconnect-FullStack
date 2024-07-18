import React, { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // If using react-router

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate(); // If using react-router

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/clients');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleSendMessage = (client) => {
        // Redirect to message page or open a modal
        navigate(`/messages/${client.id}`); // Example redirection
    };

    return (
        <main className="p-6 flex-1 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 glassmorphic">
                <h2 className="text-3xl font-bold mb-6">Client List</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {clients.map(client => (
                        <div key={client.name} className="bg-white p-4 rounded-lg shadow-md glassmorphic hover:shadow-lg transition duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src={client.profile_pic || '/images/default-profile.jpg'}
                                    alt={client.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                    onError={(e) => e.target.src = '/images/default-profile.jpg'}
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">{client.name}</h3>
                                    <p className="text-gray-500">Booked on: {client.booking_date}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => handleSendMessage(client)}
                                    className="bg-blue-500 text-white p-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-200"
                                >
                                    <FaEnvelope className="mr-2" /> Send Message
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ClientList;
