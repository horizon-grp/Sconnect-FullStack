// resources/js/Pages/BookedServicesSeeker.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ServiceSeekerLayout from '@/Layouts/ServiceSeekerLayout';

const BookedServicesSeeker = ({ bookings }) => {
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
        <ServiceSeekerLayout>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-4 rounded-lg shadow">
                            {booking.service ? (
                                <>
                                    <img src={booking.service.image} alt={booking.service.title} className="w-full h-40 object-cover rounded" />
                                    <h3 className="text-lg font-bold mt-2">{booking.service.title}</h3>
                                    <p className="text-gray-600">{booking.service.category}</p>
                                    <p className="text-gray-600">{booking.service.location}</p>
                                    <p className="text-gray-600">${booking.service.price}</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-full h-40 bg-gray-200 rounded"></div>
                                    <h3 className="text-lg font-bold mt-2">N/A</h3>
                                    <p className="text-gray-600">N/A</p>
                                    <p className="text-gray-600">N/A</p>
                                    <p className="text-gray-600">N/A</p>
                                </>
                            )}
                            <p className="text-gray-600">{booking.status}</p>
                            <div className="mt-4">
                                {booking.status === 'accepted' && (
                                    <button onClick={() => handlePay(booking.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Pay</button>
                                )}
                                {booking.status === 'paid' && (
                                    <button onClick={() => handleConfirmCompletion(booking.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Confirm Completion</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ServiceSeekerLayout>
    );
};

export default BookedServicesSeeker;
