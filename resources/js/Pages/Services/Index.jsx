import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ServiceCard from '@/Components/ServiceCard';
import CreateServiceForm from '@/Components/CreateServiceForm';
import EditServiceModal from '@/Components/EditServiceModal';

const Index = ({ auth, services }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleEditService = (service) => {
        setSelectedService(service);
    };

    const handleDeleteService = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            Inertia.delete(`/services/${id}`);
        }
    };

    const handleCreateService = () => {
        setIsCreating(true);
    };

    const handleCloseCreateForm = () => {
        setIsCreating(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="p-6 flex-1 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 neumorphic">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold">My Services</h2>
                        <button
                            onClick={handleCreateService}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Create New Service
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                        {services.map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onEdit={() => handleEditService(service)}
                                onDelete={() => handleDeleteService(service.id)}
                            />
                        ))}
                    </div>
                    {isCreating && (
                        <CreateServiceForm onClose={handleCloseCreateForm} />
                    )}
                    {selectedService && (
                        <EditServiceModal
                            service={selectedService}
                            onClose={() => setSelectedService(null)}
                        />
                    )}
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Index;
