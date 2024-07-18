import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BellIcon, UserCircleIcon, CogIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline';

const ServiceSeekerNavbar = () => {
    const { props } = usePage();
    const user = props.auth.user;
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Simulate fetching notifications
    useEffect(() => {
        setNotifications([
            'You have a new message.',
            'Your booking application has been accepted.',
            'Your password was changed successfully.'
        ]);
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const getProfilePicture = () => {
        if (user && user.profile_picture) {
            return user.profile_picture;
        }
        return '/images/default-avatar.jpg'; // Default profile picture
    };

    return (
        <nav className="bg-gray-800 shadow-md w-full h-fit">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="relative" onClick={toggleNotifications}>
                                <BellIcon className="h-6 w-6 text-white" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                                    <div className="py-1">
                                        {notifications.map((notification, index) => (
                                            <div key={index} className="px-4 py-2 text-sm text-gray-800 flex items-start">
                                                <div className="flex-shrink-0 h-8 w-8">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="/images/default-avatar.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p>{notification}</p>
                                                    <p className="text-xs text-gray-500">Just now</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <button
                            className="flex items-center text-sm focus:outline-none transition duration-150 ease-in-out"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        >
                            {getProfilePicture() ? (
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={getProfilePicture()}
                                    alt="User profile"
                                />
                            ) : (
                                <UserCircleIcon className="h-8 w-8 text-white" />
                            )}
                            <div className="ml-3 text-white hidden sm:block">
                                <span className="block">{user && user.first_name ? user.first_name : 'Guest'}</span>
                                <span className="block text-sm text-gray-400">{user && user.email ? user.email : ''}</span>
                            </div>
                        </button>
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                <Link href="client/profile" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <UserIcon className="h-5 w-5 mr-2" />
                                    Profile
                                </Link>
                                <Link href="/settings" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <CogIcon className="h-5 w-5 mr-2" />
                                    Settings
                                </Link>
                                <Link href="/logout" method="post" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <LogoutIcon className="h-5 w-5 mr-2" />
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ServiceSeekerNavbar;