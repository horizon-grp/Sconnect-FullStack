import React, { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { VictoryChart, VictoryBar } from 'victory';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Dashboard = () => {
    const { props } = usePage();
    const { user } = props;
    const [animateCharts, setAnimateCharts] = useState(false);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const [services, setServices] = useState([
        {
            id: 1,
            name: 'Plumbing Service',
            category: 'Plumbing',
            location: 'New York',
            price: 50,
            image: '/img/plumbing.jpg',
            description: 'Expert plumbing services available 24/7.',
        },
        {
            id: 2,
            name: 'Electrician Service',
            category: 'Electrician',
            location: 'San Francisco',
            price: 60,
            image: '/img/electrician.jpg',
            description: 'Professional electrical services for residential and commercial needs.',
        },
        // Add more services as needed
    ]);

    useEffect(() => {
        const handleScroll = () => {
            if (pieChartRef.current && barChartRef.current) {
                const pieChartTop = pieChartRef.current.getBoundingClientRect().top;
                const barChartTop = barChartRef.current.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (pieChartTop < windowHeight && !animateCharts) {
                    setAnimateCharts(true);
                }

                if (barChartTop < windowHeight && !animateCharts) {
                    setAnimateCharts(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [animateCharts]);

    const handleDeleteService = (serviceId) => {
        setServices(services.filter(service => service.id !== serviceId));
    };

    // Dummy data for the charts
    const barChartData = [
        { service: 'Plumbing', bookings: 25 },
        { service: 'Electrician', bookings: 18 },
        { service: 'Cleaning', bookings: 15 },
        { service: 'Maintenance', bookings: 10 },
        { service: 'Repairs', bookings: 8 }
    ];

    const transactions = [
        { id: 1, description: 'Service Fee - Plumbing', amount: 50.00 },
        { id: 2, description: 'Service Fee - Cleaning', amount: 35.00 },
        { id: 3, description: 'Service Fee - Maintenance', amount: 45.00 },
        { id: 4, description: 'Service Fee - Repairs', amount: 60.00 },
        { id: 5, description: 'Service Fee - Electrician', amount: 55.00 },
    ];

    return (
        <div className="flex-1 overflow-hidden">
            <div className="overflow-y-auto p-6 h-full">
                <main className="space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-3xl font-bold mb-4">Welcome, {user ? user.first_name : 'Guest'}</h2>
                        <p className="text-gray-600 mb-6">Here you can search for services and manage your requests.</p>
                    </div>

                    {/* Instructions Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Get Started</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Complete your profile with accurate information.</li>
                            <li>Verify your email address.</li>
                            <li>Upload your identification documents for verification.</li>
                            <li>Start posting your services and attract clients.</li>
                        </ol>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-200 rounded-lg p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-2">Total Services</h3>
                            <p className="text-gray-700 mb-4">Currently available: 50</p>
                        </div>
                        <div className="bg-green-200 rounded-lg p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-2">Active Requests</h3>
                            <p className="text-gray-700 mb-4">Pending: 10</p>
                        </div>
                        <div className="bg-red-200 rounded-lg p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-2">Avg. Response Time</h3>
                            <p className="text-gray-700 mb-4">Within 24 hours</p>
                        </div>
                        <div className="bg-yellow-200 rounded-lg p-6 shadow-xl">
                            <h3 className="text-xl font-bold mb-2">Recent Reviews</h3>
                            <p className="text-gray-700 mb-4">Service providers rated 4.5 stars</p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="mt-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 chart-section" ref={pieChartRef}>
                            <h3 className="text-xl font-bold mb-4">Latest User Transactions</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {transactions.map(transaction => (
                                    <div key={transaction.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                                        <p>{transaction.description}</p>
                                        <p>${transaction.amount.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 chart-section" ref={barChartRef}>
                            <h3 className="text-xl font-bold mb-4">Booking Trends</h3>
                            <VictoryChart domainPadding={20}>
                                <VictoryBar
                                    data={barChartData}
                                    x="service"
                                    y="bookings"
                                    style={{ data: { fill: "#6495ED" } }}
                                    animate={animateCharts}
                                />
                            </VictoryChart>
                        </div>
                    </div>

                    {/* Service Listings Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                        <h3 className="text-xl font-bold mb-4">My Services</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map(service => (
                                <div key={service.id} className="bg-gray-100 rounded-lg p-4 shadow-md">
                                    <img src={service.image} alt={service.name} className="rounded-lg w-full h-32 object-cover mb-4" />
                                    <h4 className="text-lg font-bold">{service.name}</h4>
                                    <p className="text-gray-700">{service.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-gray-600">${service.price}</p>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteService(service.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Wrap Dashboard in the Layout
Dashboard.layout = (page) => <AuthenticatedLayout children={page} />;

export default Dashboard;
