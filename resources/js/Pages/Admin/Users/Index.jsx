import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout';

const IndexUsers = () => {
    const { users } = usePage().props;

    return (
        <AdminLayout>
            <div>
                <h2 className="text-2xl font-bold">Users</h2>
                <Link href={route('admin.users.create')} className="btn btn-primary">Create User</Link>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.user_type}</td>
                                <td>
                                    <Link href={route('admin.users.edit', user.id)}>Edit</Link>
                                    <Link href={route('admin.users.show', user.id)}>Show</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default IndexUsers;
