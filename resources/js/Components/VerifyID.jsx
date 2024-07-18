import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const VerifyID = () => {
    const [formData, setFormData] = useState({
        id_card_front: null,
        id_card_back: null,
        selfie_with_id: null,
    });

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        Inertia.post('/id-verification', form);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Verify Your ID</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">ID Card Front</label>
                    <input type="file" name="id_card_front" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">ID Card Back</label>
                    <input type="file" name="id_card_back" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Selfie with ID</label>
                    <input type="file" name="selfie_with_id" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            </form>
        </div>
    );
};

export default VerifyID;
