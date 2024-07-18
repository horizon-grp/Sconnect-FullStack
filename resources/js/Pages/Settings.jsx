import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Settings = () => {
    const [formData, setFormData] = useState({
        language: 'en',
        theme: 'light',
        notifications: true,
    });

    useEffect(() => {
        // Fetch existing settings from the server
        async function fetchSettings() {
            const response = await fetch('/settings/get');
            const data = await response.json();
            setFormData(data);
        }
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/settings/update', formData);
    };

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                        Language
                                    </label>
                                    <select
                                        name="language"
                                        id="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                        {/* Add other languages as needed */}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                                        Theme
                                    </label>
                                    <select
                                        name="theme"
                                        id="theme"
                                        value={formData.theme}
                                        onChange={handleChange}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="notifications" className="block text-sm font-medium text-gray-700">
                                        Enable Notifications
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="notifications"
                                        id="notifications"
                                        checked={formData.notifications}
                                        onChange={handleChange}
                                        className="mt-1 block"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;