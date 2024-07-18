import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Reports = ({ reports, flash }) => {
    const [reportContent, setReportContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Defaulting flash to an empty object if it's null or undefined
    const safeFlash = flash || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/reports', { content: reportContent, category: selectedCategory });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-200">
                <h1 className="text-2xl font-bold mb-4">Reports</h1>
                {safeFlash.success && <div className="mb-4 text-green-600">{safeFlash.success}</div>}

                <form onSubmit={handleSubmit} className="mb-6">
                    <textarea
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        placeholder="Write your report..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-2 w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Service Quality">Service Quality</option>
                        <option value="Customer Support">Customer Support</option>
                        <option value="Other">Other</option>
                    </select>
                    <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
                        Submit Report
                    </button>
                </form>

                <h2 className="text-xl mb-2">Submitted Reports:</h2>
                {reports.length === 0 ? (
                    <p>No reports submitted yet.</p>
                ) : (
                    reports.map(report => (
                        <div key={report.id} className="p-4 mb-2 bg-white rounded shadow">
                            <p>{report.content}</p>
                            <small className="text-gray-500">Reported by: {report.user.first_name} {report.user.last_name}</small>
                            <p className="text-gray-500">Category: {report.category}</p>
                        </div>
                    ))
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Reports;
