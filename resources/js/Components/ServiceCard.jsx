import React from 'react';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';

const ServiceCard = ({ service, onEdit, onDelete, onViewMore }) => {
    // Define a default image URL
    const defaultImage = '/images/default-placeholder.jpg';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 neumorphic max-w-sm mx-auto">
            {/* Use a fallback mechanism for the image */}
            <img 
                src={service.image || defaultImage} 
                alt={service.name} 
                className="w-full h-24 object-cover rounded-t-lg"
                onError={(e) => e.target.src = defaultImage} // Handle image error
            />
            <div className="mt-4">
                <h3 className="text-lg font-bold">{service.name}</h3>
                <p className="text-gray-600">{service.category}</p>
                <p className="text-gray-600">{service.location}</p>
                <p className="text-gray-600">${service.price}</p>
                <p className="text-gray-700 mt-2 truncate">{service.description}</p>
                <div className="flex justify-between mt-4 space-x-2">
                    <button
                        onClick={onEdit}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        <FaTrash />
                    </button>
                    <button
                        onClick={onViewMore}
                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        <FaEllipsisH />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
