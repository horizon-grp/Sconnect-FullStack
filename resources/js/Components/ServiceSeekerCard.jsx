import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const ServiceSeekerCard = ({ service, onViewMore }) => {
    const defaultImage = '/images/default-placeholder.jpg';
    const truncatedDescription = service.description.length > 100
        ? `${service.description.substring(0, 100)}...`
        : service.description;

    const handleChat = () => {
        Inertia.post('/chat', { service_id: service.id });
    };

    const handleBookNow = () => {
        Inertia.post('/bookings', { service_id: service.id }, {
            onSuccess: (page) => {
                const message = page.props.flash.success;
                alert(message);  // You can replace this with a modal or redirect as needed
            },
            onError: (errors) => {
                alert('Booking failed. Please try again.');
            }
        });
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 clay max-w-xs">
            <img
                src={service.image_url || defaultImage}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
                {service.category.split(',').map((cat, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full">
                        {cat.trim()}
                    </span>
                ))}
            </div>
            <p className="mt-2 text-gray-600">{truncatedDescription}</p>
            <p className="mt-2 text-gray-600">{service.location}</p>
            <p className="mt-2 text-gray-600 font-semibold">${service.price}</p>
            <div className="flex justify-between mt-4">
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg transition-transform transform hover:scale-105"
                    onClick={handleChat}
                >
                    Chat
                </button>
                <button
                    className="bg-green-500 text-white p-2 rounded-lg transition-transform transform hover:scale-105"
                    onClick={handleBookNow}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default ServiceSeekerCard;
