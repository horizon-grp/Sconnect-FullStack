import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import GetStartedSection from '../Components/GetStartedSection';
import BookServiceSection from '../Components/BookServiceSection';
import CollaboratorsSection from '../Components/CollaboratorsSection';
import ClientReviewSection from '../Components/ClientReviewSection';
import Footer from '../Components/Footer';
import TrendingServicesSection from '@/Components/TrendingServicesSection';

export default function Welcome() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <GetStartedSection />
            <BookServiceSection />
            <TrendingServicesSection />
            <CollaboratorsSection />
            <ClientReviewSection />
            <Footer />
        </div>
    );
}
