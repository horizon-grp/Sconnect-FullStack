import React from 'react';
import { Link } from '@inertiajs/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import styles from './Footer.module.css';

export default function Footer() {
    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 600 }
    });

    const socialIconsAnimation = useSpring({
        from: { opacity: 0, transform: 'translateX(-20px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        delay: 300,
        config: { duration: 600 }
    });

    const linksAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 400,
        config: { duration: 600 }
    });

    return (
        <footer className="bg-gray-900 py-12">
            <div className="container mx-auto px-6 text-gray-200">
                <animated.div style={fadeIn} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className={`${styles.card} p-6 rounded-lg shadow-lg`}>
                        <h3 className="text-xl font-bold mb-4">Service Connect</h3>
                        <p className="mb-4">Connecting freelancers with clients worldwide.</p>
                        <animated.div style={socialIconsAnimation} className="flex space-x-4 mt-4">
                            {["facebook.com", "twitter.com", "linkedin.com", "instagram.com"].map((url, index) => {
                                const icons = [FaFacebook, FaTwitter, FaLinkedin, FaInstagram];
                                const Icon = icons[index];
                                return (
                                    <Link key={index} href={`https://${url}`} className="text-gray-400 hover:text-current transition-colors duration-300">
                                        <Icon size={28} />
                                    </Link>
                                );
                            })}
                        </animated.div>
                    </div>

                    {["Company", "Services", "Legal"].map((title, index) => (
                        <animated.div key={index} style={linksAnimation} className={`${styles.card} p-6 rounded-lg shadow-lg`}>
                            <h3 className="text-xl font-bold mb-4">{title}</h3>
                            <ul className="space-y-2">
                                {title === "Company" && ["About Us", "Contact", "FAQs"].map((link, i) => (
                                    <li key={i}>
                                        <Link href={`/${link.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-white transition-colors duration-300">{link}</Link>
                                    </li>
                                ))}
                                {title === "Services" && ["Our Services", "Find Jobs", "Book a Service"].map((link, i) => (
                                    <li key={i}>
                                        <Link href={`/${link.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-white transition-colors duration-300">{link}</Link>
                                    </li>
                                ))}
                                {title === "Legal" && ["Privacy Policy", "Terms of Service"].map((link, i) => (
                                    <li key={i}>
                                        <Link href={`/${link.toLowerCase().replace(/ /g, "-")}`} className="text-gray-400 hover:text-white transition-colors duration-300">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </animated.div>
                    ))}
                </animated.div>
                <animated.div style={fadeIn} className="mt-8 text-center">
                    <p className="text-gray-400">&copy; 2024 Service Connect. All rights reserved.</p>
                </animated.div>
            </div>
        </footer>
    );
}
