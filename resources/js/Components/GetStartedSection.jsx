import React from 'react';
import { useSpring, animated } from 'react-spring';

// Import your images
import createProfileImg from '@/Components/assets/createProfile.jpg';
import showcaseWorkImg from '@/Components/assets/showcaseWork.jpg';
import setPricingImg from '@/Components/assets/setPricing.jpg';
// import connectClientsImg from '@/assets/connectClients.png';

export default function GetStartedSection() {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 },
    });

    const cardAnimation = useSpring({
        from: { transform: 'translateY(20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: { duration: 500 },
        delay: 300,
    });

    return (
        <section className="bg-gradient-to-r from-gray-800 to-gray-600 py-16">
            <div className="container mx-auto px-6 text-center">
                <animated.h2 style={fadeIn} className="text-4xl font-bold text-white">
                    Get Started with Service Connect
                </animated.h2>
                <p className="mt-4 text-gray-300">Follow these professional steps to showcase your services effectively.</p>
                <div className="mt-8 flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4">
                    <animated.div style={cardAnimation} className="w-full md:w-1/4 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl">
                        <img src={createProfileImg} alt="Create Profile" className="w-full h-32 object-cover rounded-t-lg mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-800">1. Create Your Profile</h3>
                        <p className="mt-2 text-gray-600">Add details about your skills, services, and experience to attract potential clients.</p>
                    </animated.div>
                    <animated.div style={cardAnimation} className="w-full md:w-1/4 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl">
                        <img src={showcaseWorkImg} alt="Showcase Work" className="w-full h-32 object-cover rounded-t-lg mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-800">2. Showcase Your Work</h3>
                        <p className="mt-2 text-gray-600">Upload samples, case studies, and testimonials to demonstrate your expertise and previous success.</p>
                    </animated.div>
                    <animated.div style={cardAnimation} className="w-full md:w-1/4 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl">
                        <img src={setPricingImg} alt="Set Pricing" className="w-full h-32 object-cover rounded-t-lg mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-800">3. Set Your Pricing</h3>
                        <p className="mt-2 text-gray-600">Define your rates and pricing packages to make it easy for clients to understand your value.</p>
                    </animated.div>
                    <animated.div style={cardAnimation} className="w-full md:w-1/4 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl">
                        {/* <img src={connectClientsImg} alt="Connect with Clients" className="w-full h-32 object-cover rounded-t-lg mb-4"/> */}
                        <h3 className="text-xl font-semibold text-gray-800">4. Connect with Clients</h3>
                        <p className="mt-2 text-gray-600">Engage with potential clients through direct messages and proposal submissions.</p>
                    </animated.div>
                </div>
            </div>
        </section>
    );
}
