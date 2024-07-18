import React from 'react';
import CustomModal from '@/Components/CustomModal';

const ServiceSeekerDetailModal = ({ service, onClose }) => {
    return (
        <CustomModal isOpen={true} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <img src={service.image_url} alt={service.title} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
                <p className="mt-4">{service.description}</p>
                <p className="mt-4">{service.location}</p>
                <p className="mt-4">${service.price}</p>
                <p className="mt-4">{service.category}</p>
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-lg"
                        onClick={() => console.log('Chat')}
                    >
                        Chat
                    </button>
                    <button
                        className="bg-green-500 text-white p-2 rounded-lg"
                        onClick={() => console.log('Book Now')}
                    >
                        Book Now
                    </button>
                    <button
                        className="bg-blue-500 text-white p-2 rounded-lg"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default ServiceSeekerDetailModal;
