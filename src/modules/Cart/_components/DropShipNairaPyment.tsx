export const DropShipNairaPayment = ({
  total_price,
  paymentKey,
}: {
  total_price: number;
  paymentKey: string;
}) => {
  const { user } = useAppState();
  const config = useMemo(
    () => ({
      reference: new Date().getTime().toString(),
      email: user?.email || "user@example.com", // Use actual user email
      amount: total_price * 100, // Amount in kobo.
      publicKey: paymentKey,
      currency: "NGN", // Specify the currency.
    }),
    [paymentKey, total_price, user?.email],
  );
  return (
    <div className=" " data-theme="kudu">
      <DropShipPaymentButton>N {total_price}</DropShipPaymentButton>
    </div>
  );
};

// PaymentButton.jsx
import { Button } from "@material-tailwind/react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import useAppState from "../../../hooks/appState";
import { useMemo } from "react";

const DropShipPaymentButton = ({
  config,
  disabled,
  children,
  onSuccess,
  onError,
  onClose,
}: any) => {
  // Initialize the payment function with the latest config.
  const { user } = useAppState();

  const initializePayment = usePaystackPayment(config);

  const handleClick = () => {
    if (user) {
      if (user.location) {
        if (!config.publicKey) {
          console.error("Payment key not loaded");
          return;
        }
        initializePayment({ onSuccess, onClose });
      } else {
        toast.error(
          "Default Shipping Address not set, visit your profile to set up one",
        );
      }
    } else {
      initializePayment({ onSuccess, onClose });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`btn btn-primary`}
    >
      {children}
    </button>
  );
};
