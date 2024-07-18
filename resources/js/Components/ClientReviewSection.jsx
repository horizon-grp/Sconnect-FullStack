import React from 'react';
import { Link } from '@inertiajs/react';
import Slider from 'react-slick';
import { useSpring, animated } from 'react-spring';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ClientReviewSection() {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 }
    });

    const buttonAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
        delay: 600
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-6 text-center">
                <animated.h2 style={fadeIn} className="text-3xl font-bold text-gray-800 mb-4">
                    Ready to Get Started?
                </animated.h2>
                <animated.p style={fadeIn} className="text-gray-600 mb-8">
                    Here's what our clients are saying about us
                </animated.p>
                <Slider {...settings} className="mb-8">
                    {["John Doe", "Jane Smith", "Alex Johnson"].map((name, index) => (
                        <div key={index} className="p-4">
                            <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
                                <p className="text-gray-600">"Service Connect helped me find the perfect freelancer for my project. Highly recommend!"</p>
                                <p className="mt-2 text-gray-800 font-semibold">- {name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
                <animated.div style={buttonAnimation} className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <Link href="/register" className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 transform hover:-translate-y-1">
                        Get Started
                    </Link>
                </animated.div>
            </div>
        </section>
    );
}
