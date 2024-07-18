import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import ServiceSeekerLayout from '@/Layouts/ServiceSeekerLayout';

const Appointments = ({ appointments }) => {
    const handleConfirm = (id) => {
        Inertia.post(`/appointments/${id}/confirm`);
    };

    const handleComplete = (id) => {
        Inertia.post(`/appointments/${id}/complete`);
    };

    const handleCancel = (id) => {
        Inertia.post(`/appointments/${id}/cancel`);
    };

    return (
        <ServiceSeekerLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Appointments</h1>
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead>
                        <tr>
                            <th className="p-4 border-b">Service</th>
                            <th className="p-4 border-b">Provider</th>
                            <th className="p-4 border-b">Date</th>
                            <th className="p-4 border-b">Time</th>
                            <th className="p-4 border-b">Status</th>
                            <th className="p-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="p-4 border-b">{appointment.service.title}</td>
                                <td className="p-4 border-b">{appointment.service_provider.name}</td>
                                <td className="p-4 border-b">{appointment.date}</td>
                                <td className="p-4 border-b">{appointment.time}</td>
                                <td className="p-4 border-b">{appointment.status}</td>
                                <td className="p-4 border-b">
                                    {appointment.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleConfirm(appointment.id)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleCancel(appointment.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {appointment.status === 'confirmed' && (
                                        <button
                                            onClick={() => handleComplete(appointment.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ServiceSeekerLayout>
    );
};

export default Appointments;
