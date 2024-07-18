import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Bookings = ({ bookings }) => {

    const handleAccept = (id) => {
        Inertia.post(`/bookings/${id}/accept`);
    };

    const handleReject = (id) => {
        Inertia.post(`/bookings/${id}/reject`);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id} className="mb-4 p-4 border border-gray-300 rounded">
                        <h3 className="text-xl font-semibold">{booking.service.name}</h3>
                        <p>Status: {booking.status}</p>
                        <button onClick={() => handleAccept(booking.id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">Accept</button>
                        <button onClick={() => handleReject(booking.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bookings;
