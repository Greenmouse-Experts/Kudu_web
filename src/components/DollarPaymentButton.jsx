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

const CheckoutForm = ({ closeModal, amount, successCall }) => {
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
        setErrorMessage(null);

        try {
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
                    closeModal(); // Close on API error
                },
            });
        } catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
            closeModal(); // Close on unexpected errors
        }
    };

    const handlePayment = async (clientSecret) => {
        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                clientSecret,
                redirect: 'if_required'
            });

            if (error) {
                throw error;
            }

            console.log("Payment successful:", paymentIntent.id);

            if (successCall) {
                successCall();
            } else {
                mutate({
                    url: "/user/checkout/dollar",
                    method: "POST",
                    data: {
                        refId: `${paymentIntent.id}`,
                        shippingAddress: `${user.location.city} ${user.location.state}, ${user.location.country}`
                    },
                    headers: true,
                    onSuccess: () => {
                        console.log("Order confirmed!");
                        closeModal();
                    },
                    onError: (error) => {
                        setErrorMessage(error.message);
                        closeModal(); // Close on order API error
                    },
                    onSettled: () => {
                        setLoading(false);
                    },
                });
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
            closeModal(); // Close on Stripe confirmation error
        }
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
            {errorMessage && (
                <div className="text-red-500 mt-2">
                    {errorMessage} (Closing in 3 seconds...)
                </div>
            )}
        </form>
    );
};




const DollarPaymentButton = ({ amount, children, noWidth, bgColor, onSuccess }) => {
    const { openModal, closeModal } = useModal();
    const stripePromise = loadStripe(stripeKey);

    const options = {
        mode: 'payment',
        amount: amount * 100,
        currency: 'usd',
        appearance: {
            theme: 'stripe',
        },
        wallets: {
            link: false // Disable Link wallet completely
        },
    };


    const handleModal = () => {
        openModal({
            size: "sm",
            content: (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm closeModal={closeModal} amount={amount * 100} successCall={onSuccess} />
                </Elements>
            )
        });
    };

    return (
        <Button
            onClick={handleModal}
            className={`${noWidth ? '' : 'w-3/4'} py-3 px-4 flex justify-center gap-2 ${bgColor || 'bg-kuduOrange'} shadow-md text-white rounded-lg font-[500] transition-colors`}
        >
            {children}
        </Button>
    );
};

export default DollarPaymentButton;
