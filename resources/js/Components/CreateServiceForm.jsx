import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import toast, { Toaster } from 'react-hot-toast';

const CreateServiceForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('remote'); // Default to "remote"
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('location', location);
        if (image) {
            formData.append('image', image);
        }

        try {
            await Inertia.post('/services', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onSuccess: () => {
                    toast.success('Service created successfully!');
                    Inertia.visit(window.location.href, { method: 'get' });
                },
                onError: (errors) => {
                    setErrors(errors);
                    toast.error('Failed to create service. Please try again.');
                },
                onFinish: () => {
                    setIsSubmitting(false);
                    onClose();
                },
            });
        } catch (error) {
            console.error('Error creating service:', error);
            setIsSubmitting(false);
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <Toaster />
                <h3 className="text-xl font-bold mb-4">Create New Service</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        >
                            <option value="remote">Remote</option>
                            <option value="onsite">Onsite</option>
                        </select>
                        {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-red-500 text-white p-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateServiceForm;
