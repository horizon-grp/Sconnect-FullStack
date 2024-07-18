// resources/js/Pages/BookedServicesProvider.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const BookedServicesProvider = ({ bookings }) => {
    const [filters, setFilters] = useState({
        day: '',
        category: '',
        status: '',
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handlePay = (bookingId) => {
        Inertia.post(`/bookings/${bookingId}/pay`, {}, {
            onSuccess: () => alert('Payment successful'),
            onError: () => alert('Error processing payment'),
        });
    };

    const handleConfirmCompletion = (bookingId) => {
        Inertia.post(`/bookings/${bookingId}/confirm`, {}, {
            onSuccess: () => alert('Service confirmed completed'),
            onError: () => alert('Error confirming service completion'),
        });
    };

    const filteredBookings = bookings.filter(booking => {
        return (
            (filters.day ? booking.day === filters.day : true) &&
            (filters.category ? booking.service?.category === filters.category : true) &&
            (filters.status ? booking.status === filters.status : true)
        );
    });

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Booked Services</h1>
                <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        name="day"
                        placeholder="Day"
                        value={filters.day}
                        onChange={handleFilterChange}
                        className="p-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="p-2 rounded-lg border border-gray-300"
                    />
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="p-2 rounded-lg border border-gray-300"
                    >
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="paid">Paid</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead>
                        <tr>
                            <th className="p-4 border-b">Service</th>
                            <th className="p-4 border-b">Category</th>
                            <th className="p-4 border-b">Location</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Status</th>
                            <th className="p-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id}>
                                {booking.service ? (
                                    <>
                                        <td className="p-4 border-b">{booking.service.title}</td>
                                        <td className="p-4 border-b">{booking.service.category}</td>
                                        <td className="p-4 border-b">{booking.service.location}</td>
                                        <td className="p-4 border-b">${booking.service.price}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4 border-b">N/A</td>
                                        <td className="p-4 border-b">N/A</td>
                                        <td className="p-4 border-b">N/A</td>
                                        <td className="p-4 border-b">N/A</td>
                                    </>
                                )}
                                <td className="p-4 border-b">{booking.status}</td>
                                <td className="p-4 border-b">
                                    {booking.status === 'accepted' && (
                                        <button onClick={() => handlePay(booking.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Pay</button>
                                    )}
                                    {booking.status === 'paid' && (
                                        <button onClick={() => handleConfirmCompletion(booking.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Confirm Completion</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default BookedServicesProvider;
