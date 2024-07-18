// resources/js/Pages/ServiceSeeker/MakePayment.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const MakePayment = ({ appointment }) => {
    const [amount, setAmount] = useState('');
    const [stripeToken, setStripeToken] = useState(null);

    const handlePayment = (event) => {
        event.preventDefault();

        window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY).createToken({
            name: 'Service Seeker',
        }).then((result) => {
            if (result.error) {
                console.error(result.error.message);
            } else {
                setStripeToken(result.token.id);
                Inertia.post('/service-seeker/payments', {
                    appointment_id: appointment.id,
                    amount: amount,
                    stripeToken: result.token.id,
                });
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Make Payment</h1>
            <form onSubmit={handlePayment}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Card Details
                    </label>
                    <div id="card-element" className="p-2 border"></div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Pay
                </button>
            </form>
        </div>
    );
};

export default MakePayment;
