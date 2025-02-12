// PaymentButton.jsx
import { Button } from "@material-tailwind/react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";

const PaymentButton = ({ config, onSuccess, user, onClose, children, noWidth }) => {
    console.log(user)
    // Initialize the payment function with the latest config.
    const initializePayment = usePaystackPayment(config);

    const handleClick = () => {
        if (user) {
            if (user.location) {
                if (!config.publicKey) {
                    console.error("Payment key not loaded");
                    return;
                }
                initializePayment({ onSuccess, onClose });
            }
            else {
                toast.error('Default Shipping Address not set, visit your profile to set up one')
            }
        }
        else {
            initializePayment({ onSuccess, onClose });
        }
    };

    return (
        <Button
            onClick={handleClick}
            className={`${noWidth ? '' : 'w-3/4'} py-3 px-4 flex justify-center gap-2 bg-kuduOrange text-white rounded-lg font-[500] transition-colors`}
        >
            {children}
        </Button>
    );
};

export default PaymentButton;
