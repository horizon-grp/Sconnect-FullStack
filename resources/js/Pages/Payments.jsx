
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ServiceSeekerLayout from '@/Layouts/ServiceSeekerLayout';

const Payments = ({ payments }) => {
    return (
        <ServiceSeekerLayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Service</th>
                        <th className="py-2">Provider</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td className="py-2">{payment.appointment.service.title}</td>
                            <td className="py-2">{payment.appointment.service_provider.name}</td>
                            <td className="py-2">${payment.amount}</td>
                            <td className="py-2">{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </ServiceSeekerLayout>
    );
};

export default Payments;
