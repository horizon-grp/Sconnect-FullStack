import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Verifications = ({ verifications }) => {
    const handleApprove = (id) => {
        Inertia.post(route('admin.verifications.approve', id));
    };

    const handleReject = (id) => {
        Inertia.post(route('admin.verifications.reject', id));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {verifications.map((verification) => (
                        <div key={verification.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">{verification.user.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{verification.additional_info}</p>
                            <div className="mb-2">
                                <img src={`/storage/${verification.id_card_front}`} alt="ID Card Front" className="w-full h-auto rounded-lg" />
                            </div>
                            <div className="mb-2">
                                <img src={`/storage/${verification.id_card_back}`} alt="ID Card Back" className="w-full h-auto rounded-lg" />
                            </div>
                            <div className="mb-2">
                                <img src={`/storage/${verification.selfie_with_id}`} alt="Selfie with ID" className="w-full h-auto rounded-lg" />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded"
                                    onClick={() => handleApprove(verification.id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded"
                                    onClick={() => handleReject(verification.id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Verifications;
