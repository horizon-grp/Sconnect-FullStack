import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const Services = ({ services }) => {
    return (
        <div>
            <h1>Services</h1>
            <InertiaLink href={route('admin.services.create')}>Create New Service</InertiaLink>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.category}</td>
                            <td>{service.price}</td>
                            <td>{service.location}</td>
                            <td>
                                <InertiaLink href={route('admin.services.edit', service.id)}>Edit</InertiaLink>
                                <button onClick={() => handleDelete(service.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const handleDelete = id => {
    if (confirm('Are you sure you want to delete this service?')) {
        Inertia.delete(route('admin.services.destroy', id));
    }
};

export default Services;
