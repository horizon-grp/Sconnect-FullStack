import React from 'react';

export default function CollaboratorsSection() {
    const logos = [
        '/path/to/logo1.png',
        '/path/to/logo2.png',
        '/path/to/logo3.png',
        // Add more logos as needed
    ];

    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Collaborators</h2>
                <div className="relative overflow-hidden">
                    <div className="flex space-x-6 animate-slide">
                        {logos.map((logo, index) => (
                            <img key={index} src={logo} alt={`Logo ${index + 1}`} className="h-16 opacity-80 hover:opacity-100 transition-opacity duration-300" />
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .animate-slide {
                    display: flex;
                    animation: slide 20s linear infinite;
                }

                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
            `}</style>
        </section>
    );
}
