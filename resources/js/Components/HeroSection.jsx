import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    const [showButton, setShowButton] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight / 2) {
                setShowButton(true);
                setContentVisible(true);
            } else {
                setShowButton(false);
                setContentVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <section className={styles.heroSection}>
                <div className={`${styles.container} mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10`}>
                    <div className={`${styles.textSection} animate-fadeIn`}>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slideInRight">
                            DISCOVER & BOOK TOP TALENT
                        </h1>
                        <p className="text-gray-600 mb-4 animate-slideInRight">
                            <Typewriter
                                options={{
                                    strings: ['Top freelancers for your projects'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </p>
                        <p className="text-gray-600 mb-8 animate-slideInRight">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Find skilled professionals for any job, anytime.',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 mb-4 animate-slideInLeft">
                            <a href="/hire" className={styles.primaryButton}>
                                Hire Talent
                            </a>
                            <a href="/services" className={styles.primaryButton}>
                                Book Services
                            </a>
                        </div>
                        <div className={`${styles.searchBar} animate-slideInLeft`}>
                            <input
                                type="text"
                                placeholder="Service | Location | Price"
                                className="w-full p-2 bg-transparent focus:outline-none"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-full">Search</button>
                        </div>
                    </div>
                    <div className={`${styles.imageSection} animate-fadeIn`}>
                        <img
                            src="Components/assets/hero.jpg"
                            alt="Placeholder"
                            className="rounded-md shadow-lg glassmorphism"
                        />
                    </div>
                </div>
                <div className={styles.fallingParticles}></div>
                <svg
                    className={styles.waveAnimation}
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                >
                    <path fillOpacity="1" d="M0,64L40,90.7C80,117,160,171,240,186.7C320,203,400,181,480,154.7C560,128,640,96,720,90.7C800,85,880,107,960,122.7C1040,139,1120,149,1200,160C1280,171,1360,181,1400,186.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" fill="url(#grad1)"></path>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#007bff', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#0056b3', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                </svg>
                {showButton && (
                    <div className="fixed bottom-4 right-4 animate-bounce">
                        <button
                            onClick={scrollToTop}
                            className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
                        >
                            <FaArrowUp />
                        </button>
                    </div>
                )}
            </section>
            <section className={`${styles.whyChooseUsSection} ${contentVisible ? styles.visible : ''}`}>
                <div className="container mx-auto px-6 py-16 relative">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                            <div className="flex flex-col space-y-2">
                                <button className="p-4 text-left font-semibold rounded-lg bg-blue-600 text-white">
                                    Benefits
                                </button>
                                <button className="p-4 text-left font-semibold rounded-lg bg-gray-100 text-gray-800">
                                    Features
                                </button>
                                <button className="p-4 text-left font-semibold rounded-lg bg-gray-100 text-gray-800">
                                    Statistics
                                </button>
                            </div>
                        </div>
                        <div className="md:w-3/4 relative">
                            <div className="absolute -left-20 -top-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob"></div>
                            <div className="absolute -right-20 -top-20 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-20 left-1/2 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob animation-delay-4000"></div>
                            <div className="transition-opacity duration-500 ease-in-out relative">
                                <div className="space-y-4">
                                    <div className={`${styles.interactiveCard} p-6 rounded-lg shadow-lg glassmorphism relative z-10 animate-fadeInUp`}>
                                        <h3 className="text-xl font-semibold mb-2">Top Talent</h3>
                                        <p className="text-gray-600">Access to a diverse pool of highly skilled professionals.</p>
                                    </div>
                                    <div className={`${styles.interactiveCard} p-6 rounded-lg shadow-lg glassmorphism relative z-10 animate-fadeInUp`}>
                                        <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                                        <p className="text-gray-600">Safe and reliable payment methods with full transparency.</p>
                                    </div>
                                    <div className={`${styles.interactiveCard} p-6 rounded-lg shadow-lg glassmorphism relative z-10 animate-fadeInUp`}>
                                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                                        <p className="text-gray-600">Round-the-clock assistance to address any issues promptly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
