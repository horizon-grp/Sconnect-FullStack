import React from 'react';

const ViewServiceModal = ({ service, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Service Details</h2>
                <img
                    src={service.image || '/images/default-placeholder.jpg'}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <p className="text-lg font-bold">{service.name}</p>
                <p className="text-gray-600">Category: {service.category}</p>
                <p className="text-gray-600">Location: {service.location}</p>
                <p className="text-gray-600">Price: ${service.price}</p>
                <p className="text-gray-700 mt-2">{service.description}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewServiceModal;
