import React, { useState, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { AiOutlineAppstore } from 'react-icons/ai';

const categories = [
    { id: 1, name: 'Translation' },
    { id: 2, name: 'Accountancy' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Web Development' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = useCallback(() => setIsDropdownOpen(true), []);
    const handleMouseLeave = useCallback(() => setIsDropdownOpen(false), []);
    const toggleDropdown = useCallback(() => setIsDropdownOpen(prev => !prev), []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-semibold text-gray-800">Service Connect</Link>
                <div className="hidden md:flex md:items-center md:space-x-6 mx-auto">
                    <Link href="/" className="text-blue-500 transition duration-300 ease-in-out hover:text-blue-700">Home</Link>
                    <Link href="/about" className="text-gray-800 transition duration-300 ease-in-out hover:text-blue-500">About</Link>
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="flex items-center text-gray-800 transition duration-300 ease-in-out hover:text-blue-500 focus:outline-none">
                            Services <FaChevronDown className={`ml-2 transform transition duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md z-50 mt-2 animate-fade-in-down">
                                {categories.map(category => (
                                    <Link
                                        key={category.id}
                                        href={`/services/${category.name}`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                                    >
                                        <AiOutlineAppstore className="mr-2" /> {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden md:flex md:items-center space-x-4">
                    <Link href="/login" className="text-gray-800 transition duration-300 ease-in-out hover:text-blue-500 ml-4">Login</Link>
                    <Link href="/register" className="bg-blue-500 text-white px-3 py-2 rounded-md ml-4 transition duration-300 ease-in-out hover:bg-blue-700">Sign Up</Link>
                </div>
                <div className="flex items-center md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
                        <svg className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                        <FaTimes className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`} />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 p-4">
                    <Link href="/" className="text-blue-500 transition duration-300 ease-in-out hover:text-blue-700" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/about" className="text-gray-800 transition duration-300 ease-in-out hover:text-blue-500" onClick={() => setIsOpen(false)}>About</Link>
                    <div className="relative w-full text-center">
                        <button onClick={toggleDropdown} className="text-gray-800 transition duration-300 ease-in-out hover:text-blue-500 focus:outline-none w-full flex items-center justify-between">
                            Services <FaChevronDown className={`ml-2 transform transition duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="w-full bg-white shadow-lg rounded-md mt-2">
                                {categories.map(category => (
                                    <Link
                                        key={category.id}
                                        href={`/services/${category.name}`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <AiOutlineAppstore className="mr-2" /> {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link href="/login" className="text-gray-800 transition duration-300 ease-in-out hover:text-blue-500 ml-4" onClick={() => setIsOpen(false)}>Login</Link>
                    <Link href="/register" className="bg-blue-500 text-white px-3 py-2 rounded-md ml-4 transition duration-300 ease-in-out hover:bg-blue-700" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    <button onClick={() => setIsOpen(false)} className="text-gray-800 focus:outline-none">
                        <FaTimes size={20} />
                    </button>
                </div>
            )}
        </nav>
    );
}
