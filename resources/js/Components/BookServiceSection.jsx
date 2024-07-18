import React from 'react';
import { FaUserPlus, FaSearch, FaComments, FaHandshake } from 'react-icons/fa';

export default function BookServiceSection() {
    const steps = [
        {
            title: "Step 1",
            description: "Browse through various service providers and find the right match for your needs.",
            icon: <FaSearch size={32} className="text-blue-500 animate-icon" />
        },
        {
            title: "Step 2",
            description: "Review profiles, past work, and client testimonials to ensure quality.",
            icon: <FaUserPlus size={32} className="text-green-500 animate-icon" />
        },
        {
            title: "Step 3",
            description: "Communicate with service providers to discuss project details and requirements.",
            icon: <FaComments size={32} className="text-purple-500 animate-icon" />
        },
        {
            title: "Step 4",
            description: "Book the service and make payments securely through our platform.",
            icon: <FaHandshake size={32} className="text-red-500 animate-icon" />
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-200">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Book Services With Service Connect</h2>
                <p className="text-lg text-gray-700 mb-12">
                    Follow these steps to easily book services and get your projects done efficiently.
                </p>
                <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative w-72 h-72 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105"
                        >
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                            <p className="mt-2 text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// CSS styles
const styles = `
    .animate-icon {
        animation: scaleRotate 2s infinite ease-in-out;
    }

    @keyframes scaleRotate {
        0%, 100% {
            transform: scale(1) rotate(0deg);
        }
        50% {
            transform: scale(1.2) rotate(10deg);
        }
    }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
