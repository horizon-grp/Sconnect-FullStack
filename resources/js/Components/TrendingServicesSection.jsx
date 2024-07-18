import React from 'react';
import { Link } from '@inertiajs/react';
import { useSpring, animated } from 'react-spring';

// Import service images
// import serviceImg1 from '@/assets/service1.jpg';
// import serviceImg2 from '@/assets/service2.jpg';
// import serviceImg3 from '@/assets/service3.jpg';
// import serviceImg4 from '@/assets/service4.jpg';

export default function TrendingServicesSection() {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 }
    });

    const cardAnimation = useSpring({
        from: { transform: 'scale(0.95)', opacity: 0.8 },
        to: { transform: 'scale(1)', opacity: 1 },
        config: { duration: 500 },
        delay: 300
    });

    const buttonAnimation = useSpring({
        from: { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' });
                await next({ transform: 'scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' });
            }
        },
        config: { duration: 500 },
        reset: true
    });

    return (
        <section className="py-16 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-70"></div>
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                        <path
                            d="M0,30 Q50,10 100,30 T200,30"
                            stroke="#e2e8f0"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="5,5"
                            style={{ animation: 'draw 10s linear infinite' }}
                        />
                        <path
                            d="M0,60 Q50,40 100,60 T200,60"
                            stroke="#e2e8f0"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="5,5"
                            style={{ animation: 'draw 10s linear infinite' }}
                        />
                    </svg>
                </div>
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <animated.h2 style={fadeIn} className="text-3xl font-bold text-gray-800 mb-6">
                    Trending Services
                </animated.h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Service Cards */}
                    <animated.div style={cardAnimation} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img
                            // src={serviceImg1}
                            alt="Creative Design"
                            className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Creative Design</h3>
                            <p className="text-gray-600 mt-2">Transform your ideas into visually stunning designs.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src="/path/to/profile-image1.jpg"
                                        alt="Jane Doe"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    />
                                    <p className="ml-2 text-gray-700">Jane Doe</p>
                                </div>
                                <animated.button style={buttonAnimation} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                                    Book Now
                                </animated.button>
                            </div>
                        </div>
                    </animated.div>

                    <animated.div style={cardAnimation} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img
                            // src={serviceImg2}
                            alt="Web Development"
                            className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Web Development</h3>
                            <p className="text-gray-600 mt-2">Build responsive and functional websites tailored to your needs.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src="/path/to/profile-image2.jpg"
                                        alt="John Smith"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    />
                                    <p className="ml-2 text-gray-700">John Smith</p>
                                </div>
                                <animated.button style={buttonAnimation} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                                    Book Now
                                </animated.button>
                            </div>
                        </div>
                    </animated.div>

                    <animated.div style={cardAnimation} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img
                            // src={serviceImg3}
                            alt="Digital Marketing"
                            className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Digital Marketing</h3>
                            <p className="text-gray-600 mt-2">Increase your online presence with effective marketing strategies.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src="/path/to/profile-image3.jpg"
                                        alt="Emily Davis"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    />
                                    <p className="ml-2 text-gray-700">Emily Davis</p>
                                </div>
                                <animated.button style={buttonAnimation} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                                    Book Now
                                </animated.button>
                            </div>
                        </div>
                    </animated.div>

                    <animated.div style={cardAnimation} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img
                            // src={serviceImg4}
                            alt="Business Consulting"
                            className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Business Consulting</h3>
                            <p className="text-gray-600 mt-2">Get expert advice to drive your business growth and success.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src="/path/to/profile-image4.jpg"
                                        alt="Michael Brown"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    />
                                    <p className="ml-2 text-gray-700">Michael Brown</p>
                                </div>
                                <animated.button style={buttonAnimation} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                                    Book Now
                                </animated.button>
                            </div>
                        </div>
                    </animated.div>
                </div>

                {/* View All Button */}
                <div className="mt-8">
                    <Link href="/services" className="text-blue-600 hover:underline text-lg">
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
