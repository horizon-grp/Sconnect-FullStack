import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaBiohazard, FaCog, FaCheck, FaEdit, FaPowerOff } from 'react-icons/fa';

const Profile = ({ profile }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        profile_picture: '',
        id_card_front: '',
        id_card_back: '',
        id_card_selfie: '',
        resume: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                phone: profile.phone,
                address: profile.address,
                bio: profile.bio,
                profile_picture: profile.profile_picture,
                id_card_front: profile.id_card_front,
                id_card_back: profile.id_card_back,
                id_card_selfie: profile.id_card_selfie,
                resume: profile.resume
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        Inertia.post(route('profile.update'), form);
    };

    const handleVerifyIDSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('id_card_front', formData.id_card_front);
        form.append('id_card_back', formData.id_card_back);
        form.append('id_card_selfie', formData.id_card_selfie);
        Inertia.post(route('profile.verifyID'), form);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-gray-500" />
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-gray-500" />
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhone className="text-gray-500" />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaBiohazard className="text-gray-500" />
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Bio"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaFileAlt className="text-gray-500" />
                            <input
                                type="file"
                                name="resume"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <input
                                type="file"
                                name="profile_picture"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
                        >
                            <FaEdit />
                            <span>Update Profile</span>
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
                            onClick={() => Inertia.post(route('profile.disable'))}
                        >
                            <FaPowerOff />
                            <span>Disable Account</span>
                        </button>
                    </div>
                </form>
                <h3 className="text-2xl font-bold mt-6">Verify ID</h3>
                <form onSubmit={handleVerifyIDSubmit} className="mt-4">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <input
                                type="file"
                                name="id_card_front"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <input
                                type="file"
                                name="id_card_back"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <input
                                type="file"
                                name="id_card_selfie"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2 mt-4"
                    >
                        <FaCheck />
                        <span>Submit for Verification</span>
                    </button>
                </form>
                <h3 className="text-2xl font-bold mt-6">Settings</h3>
                <div className="mt-4">
                    <div className="flex items-center space-x-3">
                        <FaCog className="text-gray-500" />
                        <label className="block text-gray-700">App Language</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => console.log('Change app language to:', e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            {/* Add more languages as needed */}
                        </select>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                        <FaCog className="text-gray-500" />
                        <label className="block text-gray-700">Theme</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => console.log('Change theme to:', e.target.value)}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            {/* Add more themes as needed */}
                        </select>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
);
};

export default Profile;
