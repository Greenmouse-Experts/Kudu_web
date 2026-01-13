export const DropShipNairaPayment = ({
  total_price,
  paymentKey,
}: {
  total_price: number;
  paymentKey: string;
}) => {
  const { user } = useAppState();
  const test_key = "pk_test_77297b93cbc01f078d572fed5e2d58f4f7b518d7";
  const { data: deliveryFeeData } = useQuery({
    queryKey: ["deliveryFee"],
    queryFn: async () => {
      const response = await apiClient.get(
        "/user/delivery-fees?shipToCountryCode=NG",
      );
      return response.data;
    },
  });

  const deliveryFee = deliveryFeeData?.data?.totalDeliveryFee || 0;
  const finalTotal = total_price + deliveryFee;

  const config = useMemo(
    () => ({
      reference: new Date().getTime().toString(),
      email: user?.email || "user@example.com", // Use actual user email
      amount: finalTotal * 100, // Amount in kobo.
      publicKey: test_key,
      currency: "NGN", // Specify the currency.
    }),
    [paymentKey, finalTotal, user?.email],
  );
  const { parsed_addres, zip } = get_ali_location(user.location);
  const mutate = useMutation({
    mutationFn: async (id: string) => {
      let resp = await apiClient.post("/user/checkout/", {
        refId: id,
        shippingAddress: user["location"]["street"],
        shippingAddressZipCode: user["location"]["zipCode"],
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
    <div
      className="w-full max-w-md mx-auto p-4 bg-white border border-gray-100 rounded-2xl shadow-sm"
      data-theme="kudu"
    >
      <div className="space-y-3 mb-6">
        {/*<div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">
            NGN {total_price.toLocaleString()}
          </span>
        </div>*/}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Dropship Fee</span>
          <span className="font-medium text-gray-900">
            NGN {deliveryFee?.toLocaleString()}
          </span>
        </div>
        <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">
            Total Amount
          </span>
          <span className="text-lg font-bold text-primary">
            ₦{finalTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <DropShipPaymentButton config={config} onSuccess={onSuccess}>
        <span className="flex items-center justify-center gap-2">
          Pay Now ₦{finalTotal.toLocaleString()}
        </span>
      </DropShipPaymentButton>

      <p className="text-[10px] text-center mt-3 text-gray-400 uppercase tracking-wider">
        Secure Payment via Paystack
      </p>
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
import { useMutation, useQuery } from "@tanstack/react-query";
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
