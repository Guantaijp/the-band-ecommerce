import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import PromotionalBanner from '../../components/layout/Banner/PromotionalBanner';
import ProductGrid from '../../components/products/ProductGrid/ProductGrid';
import TestimonialCard from '../../components/testimonials/TestimonialCard';
import Footer from '../../components/layout/Footer/Footer';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 pt-24 space-y-16">
                {/* Promotional Banner Section */}
                <section>
                    <PromotionalBanner />
                </section>

                {/* Product Grid Section */}
                <section>
                    <ProductGrid />
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-gradient-to-b from-white to-purple-50">
                    <TestimonialCard />
                </section>
            </main>

        </div>
    );
};

export default LandingPage;