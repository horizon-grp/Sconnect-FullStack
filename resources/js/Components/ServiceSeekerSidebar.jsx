// resources/js/Components/ServiceSeekerSidebar.jsx
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import {
    HomeIcon,
    BriefcaseIcon,
    CalendarIcon,
    CreditCardIcon,
    MailIcon,
    DocumentReportIcon,
    SupportIcon
} from '@heroicons/react/outline';

const menuItems = [
    { href: '/serviceSeeker/Dashboard', icon: <HomeIcon className="h-6 w-6" />, label: 'Home' },
    { href: '/bookedServices', icon: <BriefcaseIcon className="h-6 w-6" />, label: 'Booked Services' },
    { href: '/appointments', icon: <CalendarIcon className="h-6 w-6" />, label: 'Appointments' },
    { href: '/payments', icon: <CreditCardIcon className="h-6 w-6" />, label: 'Payments' },
    { href: '/serviceSeeker/Messages', icon: <MailIcon className="h-6 w-6" />, label: 'Messages' },
    { href: '/serviceSeeker/reports', icon: <DocumentReportIcon className="h-6 w-6" />, label: 'Reports' },
    { href: '/customer-service', icon: <SupportIcon className="h-6 w-6" />, label: 'Customer Service' },
];

const ServiceSeekerSidebar = ({ currentUrl }) => {
    return (
        <div className="flex flex-col p-6 h-screen bg-gray-800 text-white shadow-md w-17 lg:w-72">
            <div className="p-6 flex items-center justify-center mt-0 lg:justify-start">
                <img src="/path-to-your-logo.png" alt="ServiConnect Logo" className="h-8 w-8 lg:h-10 lg:w-10" />
                <span className="ml-3 text-2xl font-bold hidden lg:block">ServiConnect</span>
            </div>
            <ul className="flex-1 overflow-y-auto">
                {menuItems.map((item, index) => (
                    <li key={index} className="mb-4">
                        <InertiaLink
                            href={item.href}
                            className={`flex items-center justify-center lg:justify-start lg:space-x-3 p-2 rounded ${
                                currentUrl === item.href ? 'bg-gray-700' : ''
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="hidden lg:block">{item.label}</span>
                        </InertiaLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSeekerSidebar;
