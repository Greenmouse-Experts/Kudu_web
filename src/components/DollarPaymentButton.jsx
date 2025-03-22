import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { stripeKey } from '../config/paymentKeys';
import { Button } from '@material-tailwind/react';
import { useModal } from '../hooks/modal';
import useAppState from '../hooks/appState';
import useApiMutation from '../api/hooks/useApiMutation';

const CheckoutForm = ({ closeModal, amount }) => {
    const { user } = useAppState();
    const { mutate } = useApiMutation();


    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!elements) return;
        setLoading(true);

        try {
            // Step 1: Create PaymentIntent
            mutate({
                url: "/create-payment-intent",
                method: "POST",
                data: { amount, currency: "usd" },
                headers: true,
                onSuccess: (response) => {
                    const clientSecret = response.data.client_secret;
                    handlePayment(clientSecret);
                },
                onError: (error) => {
                    setErrorMessage(error.message);
                    setLoading(false);
                },
            });
        } catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    };

    // Step 2: Confirm Payment and Send Order Data
    const handlePayment = async (clientSecret) => {
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret
        });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        console.log("Payment successful:", paymentIntent.id);

        // Step 3: Send Order Data to Backend
        mutate({
            url: "/user/checkout/dollar",
            method: "POST",
            data: {
                refId: `${paymentIntent.id}`, // Unique transaction reference
                shippingAddress: `${user.location.city} ${user.location.state}, ${user.location.country}`
            },
            headers: true,
            onSuccess: () => {
                console.log("Order confirmed!");
                closeModal(); // Step 4: Close Modal
            },
            onError: (error) => {
                setErrorMessage(error.message);
            },
            onSettled: () => {
                setLoading(false);
            },
        });
    };


    return (
        <form onSubmit={handleSubmit} className="p-4">
            <PaymentElement />
            <div className="mt-4 flex justify-center">
                <Button
                    className="bg-kuduOrange w-1/2"
                    type="submit"
                    disabled={!stripe || !elements || loading}
                >
                    {loading ? "Processing..." : "Pay"}
                </Button>
            </div>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </form>
    );
};

const DollarPaymentButton = ({ amount, children, noWidth, bgColor }) => {
    const { openModal, closeModal } = useModal();
    const stripePromise = loadStripe(stripeKey);

    const options = {
        mode: 'payment',
        amount,
        currency: 'usd',
        appearance: { theme: 'stripe' }
    };

    const handleModal = () => {
        openModal({
            size: "sm",
            content: (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm closeModal={closeModal} amount={amount} />
                </Elements>
            )
        });
    };

    return (
        <Button
            onClick={handleModal}
            className={`${noWidth ? '' : 'w-3/4'} py-3 px-4 flex justify-center gap-2 ${bgColor || 'bg-kuduOrange'} text-white rounded-lg font-[500] transition-colors`}
        >
            {children}
        </Button>
    );
};

export default DollarPaymentButton;
