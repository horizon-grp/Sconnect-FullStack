import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout';

const EditUser = ({ user }) => {
    const { data, setData, put, errors } = useForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        user_type: user.user_type || 'service_seeker',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    return (
        <AdminLayout>
            <div>
                <h2 className="text-2xl font-bold">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={e => setData('first_name', e.target.value)}
                        />
                        {errors.first_name && <div>{errors.first_name}</div>}
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={e => setData('last_name', e.target.value)}
                        />
                        {errors.last_name && <div>{errors.last_name}</div>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div>
                        <label>User Type</label>
                        <select value={data.user_type} onChange={e => setData('user_type', e.target.value)}>
                            <option value="service_seeker">Service Seeker</option>
                            <option value="service_provider">Service Provider</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                        {errors.user_type && <div>{errors.user_type}</div>}
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditUser;
