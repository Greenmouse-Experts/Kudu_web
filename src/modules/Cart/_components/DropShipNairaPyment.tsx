export const DropShipNairaPayment = ({
  total_price,
  paymentKey,
}: {
  total_price: number;
  paymentKey: string;
}) => {
  const { user } = useAppState();
  const test_key = "pk_test_77297b93cbc01f078d572fed5e2d58f4f7b518d7";
  const config = useMemo(
    () => ({
      reference: new Date().getTime().toString(),
      email: user?.email || "user@example.com", // Use actual user email
      amount: total_price * 100 * 1400, // Amount in kobo.
      publicKey: test_key,
      currency: "NGN", // Specify the currency.
    }),
    [paymentKey, total_price, user?.email],
  );
  const { parsed_addres, zip } = get_ali_location(user.location);
  const mutate = useMutation({
    mutationFn: async (id: string) => {
      let resp = await apiClient.post("/user/checkout/", {
        refId: id,
        shippingAddress: parsed_addres,
        shippingAddressZipCode: zip,
      });
      return resp.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const onSuccess = async (id: string) => {
    toast.promise(mutate.mutateAsync(id), {
      pending: "Processing payment...",
      success: "Payment successful",
      error: "Payment failed",
    });
  };
  return (
    <div className=" w-full" data-theme="kudu ">
      <DropShipPaymentButton config={config} onSuccess={onSuccess}>
        N {total_price}
      </DropShipPaymentButton>
    </div>
  );
};

// PaymentButton.jsx
import { Button } from "@material-tailwind/react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import useAppState from "../../../hooks/appState";
import { useMemo } from "react";
import { testKey } from "../../../config/paymentKeys";
import apiClient from "../../../api/apiFactory";
import { useMutation } from "@tanstack/react-query";
import { get_ali_location } from "./DropShipDollarPayment";

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
        initializePayment({
          onSuccess: (data) => {
            onSuccess(data.reference);
          },
          onClose,
        });
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
      className={`btn btn-primary btn-block`}
    >
      {children}
    </button>
  );
};
