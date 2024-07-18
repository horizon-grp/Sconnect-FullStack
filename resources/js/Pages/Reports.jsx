import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ServiceSeekerLayout from '@/Layouts/ServiceSeekerLayout';

const Reports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDownload = () => {
        // Implement download logic here, possibly triggering a server endpoint
        alert('Download report functionality to be implemented.');
    };

    return (
        <ServiceSeekerLayout>
            <div className="flex-1 p-6 bg-gray-200">
                <h1 className="text-2xl font-bold mb-4">Reports</h1>
                
                <div className="bg-white rounded shadow-md p-4 mb-6">
                    <h2 className="text-lg font-bold mb-2">Generate Report</h2>
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        />
                        <button 
                            onClick={handleDownload}
                            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                        >
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="bg-white rounded shadow-md p-4">
                    <h2 className="text-lg font-bold mb-2">Overview</h2>
                    <ul>
                        <li>Total Earnings: $X,XXX</li>
                        <li>Total Services Provided: XX</li>
                        <li>Clients Served: XX</li>
                        <li>Latest Feedback: "Great service!"</li>
                    </ul>
                </div>
            </div>
        </ServiceSeekerLayout>
    );
};

export default Reports;
