import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout';

const CreateUser = () => {
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: 'service_seeker',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AdminLayout>
            <div>
                <h2 className="text-2xl font-bold">Create User</h2>
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
                        <label>Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <div>{errors.password}</div>}
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
                    <button type="submit">Create</button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CreateUser;
