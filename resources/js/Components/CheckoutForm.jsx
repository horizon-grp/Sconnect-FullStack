// resources/js/Components/CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Inertia } from '@inertiajs/inertia';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Jenny Rosen',
                },
            },
        });

        if (error) {
            console.error(error);
            setLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            Inertia.post('/payment/store', {
                payment_intent_id: paymentIntent.id,
                amount,
                service_provider_id: 1, // Replace with actual service provider ID
                service_id: 1, // Replace with actual service ID
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : `Pay $${amount}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
