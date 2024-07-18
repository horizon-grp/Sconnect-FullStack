import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { BellIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';

const AuthNavbar = ({ user }) => {
    const [notifications, setNotifications] = useState(['Notification 1', 'Notification 2', 'Notification 3']);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const getProfilePicture = () => {
        if (user && user.profilePicture) {
            return user.profilePicture;
        }
        return null; // No profile picture uploaded
    };

    return (
        <nav className="bg-gray-800 shadow-md w-full h-fit">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-grow flex justify-center">
                        <div className="relative text-gray-600 hidden sm:block w-1/2">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="bg-gray-200 h-10 w-full px-5 pr-10 rounded-full text-sm focus:outline-none"
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                <SearchIcon className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
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
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                                    <div className="py-1">
                                        {notifications.map((notification, index) => (
                                            <div key={index} className="px-4 py-2 text-sm text-gray-800">
                                                {notification}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                className="flex items-center text-sm focus:outline-none transition duration-150 ease-in-out"
                                onClick={toggleSearch}
                            >
                                <SearchIcon className="h-6 w-6 text-white sm:hidden" />
                            </button>
                            {showSearch && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                                    <div className="py-1 px-4">
                                        <input
                                            type="search"
                                            name="search"
                                            placeholder="Search"
                                            className="bg-gray-200 h-10 w-full px-5 rounded-full text-sm focus:outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="ml-3 relative">
                            <Link
                                href="/profile"
                                className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid transition duration-150 ease-in-out"
                            >
                                {getProfilePicture() ? (
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={getProfilePicture()}
                                        alt="User profile"
                                    />
                                ) : (
                                    <UserCircleIcon className="h-8 w-8 text-gray-800" />
                                )}
                                <span className="ml-3 text-gray-800 hidden sm:block">
                                    {user && user.first_name ? user.first_name : user && user.email ? user.email : 'Guest'}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden mt-2 px-4">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="bg-gray-200 h-10 w-full px-5 rounded-full text-sm focus:outline-none"
                    />
                </div>
            </div>
        </nav>
    );
};

export default AuthNavbar;
