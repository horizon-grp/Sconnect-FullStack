// resources/js/Pages/PaymentForm.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import StripeCheckout from 'react-stripe-checkout'; // Import Stripe Checkout

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const handlePayment = (event) => {
        event.preventDefault();
        
        if (paymentMethod === 'stripe') {
            // Handle Stripe Payment
            handleStripePayment();
        } else {
            // Handle MTN or Orange Money Payment
            Inertia.post('/payment/submit', {
                amount,
                phone_number: phoneNumber,
                payment_method: paymentMethod
            });
        }
    };

    const handleStripePayment = () => {
        // Trigger Stripe Checkout
        window.StripeCheckout.open({
            key: 'your_stripe_public_key',
            amount: amount * 100, // Amount in cents
            name: 'Payment',
            description: 'Complete your payment',
            currency: 'USD',
            token: (token) => {
                Inertia.post('/payment/stripe', {
                    amount,
                    stripeToken: token.id
                });
            }
        });
    };

    return (
        <div className="p-6 bg-gray-200">
            <h1 className="text-2xl font-bold mb-4">Payment</h1>
            <form onSubmit={handlePayment}>
                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number (if applicable)</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border rounded w-full p-2"
                        placeholder="Enter phone number for MTN/Orange"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="orange">Orange Money</option>
                        <option value="stripe">Stripe</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
