// resources/js/Pages/Transactions.jsx
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Transactions = ({ transactions }) => {
    return (
        <AuthenticatedLayout>
            <div className="flex-1 p-6 bg-gray-200">
                <h1 className="text-2xl font-bold mb-4">Transactions</h1>
                {transactions.length === 0 ? (
                    <div className="text-center p-6 bg-white rounded shadow-md neumorphic">
                        <p className="text-gray-600">No transactions yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded shadow-md neumorphic neumorphic-table">
                            <thead>
                                <tr>
                                    <th className="p-2">Amount</th>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id}>
                                        <td className="p-2">{transaction.amount}</td>
                                        <td className="p-2">{transaction.created_at}</td>
                                        <td className="p-2">{transaction.status}</td>
                                        <td className="p-2">
                                            {transaction.status === 'in_escrow' && (
                                                <InertiaLink
                                                    href={`/transactions/release/${transaction.id}`}
                                                    method="post"
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Release
                                                </InertiaLink>
                                            )}
                                            {transaction.status === 'in_escrow' && (
                                                <InertiaLink
                                                    href={`/transactions/cancel/${transaction.id}`}
                                                    method="post"
                                                    className="text-red-600 hover:text-red-900 ml-4"
                                                >
                                                    Cancel
                                                </InertiaLink>
                                            )}
                                            {transaction.status !== 'in_escrow' && (
                                                <span>{transaction.status}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Transactions;
