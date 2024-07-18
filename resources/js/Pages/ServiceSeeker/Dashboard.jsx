import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import ServiceSeekerCard from '@/Components/ServiceSeekerCard';
import ServiceSeekerDetailModal from '@/Components/ServiceSeekerDetailModal';
import ServiceSeekerLayout from '@/Layouts/ServiceSeekerLayout';

const ServiceSeekerDashboard = () => {
    const { user, services, flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServices, setFilteredServices] = useState(services);
    const [selectedService, setSelectedService] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    useEffect(() => {
        if (flash && flash.success) {
            setFlashMessage(flash.success);
            setTimeout(() => setFlashMessage(null), 5000);
        }
    }, [flash]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredServices(services.filter(service =>
                service.title.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredServices(services);
        }
    }, [searchTerm, services]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleViewMore = (service) => {
        setSelectedService(service);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    const currentDay = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <ServiceSeekerLayout>
            <div className="flex flex-col lg:flex-row p-6">
                <div className="flex-1 lg:mr-6 mt-6 lg:mt-0">
                    <div className="bg-blue-500 p-4 rounded-lg text-white mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl">{getGreeting()}, {user.first_name}.</h2>
                            <p className="mt-2">{currentDay}</p>
                        </div>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l6 6-6 6M9 7h12"></path>
                        </svg>
                    </div>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search Service"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none"
                        />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M9 5a7 7 0 100 14 7 7 0 000-14z" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <ServiceSeekerCard
                                key={service.id}
                                service={service}
                                onViewMore={handleViewMore}
                            />
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/4 lg:ml-6 mt-6 lg:mt-0">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Filters</h3>
                        <div>
                            <label className="block mb-2 text-gray-700">Category</label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg">
                                <option value="">All</option>
                                {/* Add categories dynamically */}
                                {services.map((service) => (
                                    <option key={service.id} value={service.category}>{service.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-gray-700">Price Range</label>
                            <input type="range" className="w-full" min="0" max="1000" />
                        </div>
                        {/* Add more filters as needed */}
                    </div>
                </div>
                {selectedService && (
                    <ServiceSeekerDetailModal
                        service={selectedService}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </ServiceSeekerLayout>
    );
};

export default ServiceSeekerDashboard;
