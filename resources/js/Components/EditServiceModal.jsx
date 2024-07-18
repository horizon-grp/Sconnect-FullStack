import React, { useState } from 'react';

const EditServiceModal = ({ service, onClose }) => {
    const [name, setName] = useState(service.name);
    const [category, setCategory] = useState(service.category);
    const [location, setLocation] = useState(service.location);
    const [price, setPrice] = useState(service.price);
    const [description, setDescription] = useState(service.description);

    const handleSubmit = () => {
        // Implement update functionality here
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Service</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-red-500 text-white p-2 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditServiceModal;
