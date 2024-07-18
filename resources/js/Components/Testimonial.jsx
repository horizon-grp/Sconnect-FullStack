import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: 'John Doe',
        title: 'CEO of Company XYZ',
        content: 'Great service! Highly recommend.',
        image: 'Components/assets/testimonial1.jpg',
        rating: 5,
    },
    {
        id: 2,
        name: 'Jane Smith',
        title: 'Freelancer',
        content: 'Very professional and reliable.',
        image: 'Components/assets/testimonial2.jpg',
        rating: 4,
    },
    {
        id: 3,
        name: 'Sam Wilson',
        title: 'Entrepreneur',
        content: 'Excellent support and quality services.',
        image: 'Components/assets/testimonial3.jpg',
        rating: 5,
    },
];

const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'} />
        );
    }
    return stars;
};

export default function Testimonial() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-20 h-20 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{testimonial.name}</h3>
                            <p className="text-gray-600 mb-4">{testimonial.title}</p>
                            <div className="flex justify-center mb-4">{renderStars(testimonial.rating)}</div>
                            <p className="text-gray-600">{testimonial.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
