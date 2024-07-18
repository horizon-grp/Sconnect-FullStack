// resources/js/Pages/Verification/Verify.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UploadIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/outline';

const Verify = () => {
    const [formData, setFormData] = useState({
        id_card_front: null,
        id_card_back: null,
        selfie_with_id: null,
        additional_info: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('id_card_front', formData.id_card_front);
        form.append('id_card_back', formData.id_card_back);
        form.append('selfie_with_id', formData.selfie_with_id);
        form.append('additional_info', formData.additional_info);
        Inertia.post(route('verification.store'), form);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
                    Verify Your Identity
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID Card Front</label>
                        <input
                            type="file"
                            name="id_card_front"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID Card Back</label>
                        <input
                            type="file"
                            name="id_card_back"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Selfie with ID Card</label>
                        <input
                            type="file"
                            name="selfie_with_id"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Additional Information</label>
                        <textarea
                            name="additional_info"
                            value={formData.additional_info}
                            onChange={handleTextChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                    >
                        <UploadIcon className="h-5 w-5 mr-2" />
                        Submit for Verification
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Verify;
