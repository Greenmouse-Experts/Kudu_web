import { useEffect, useState, useMemo } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import useAppState from "../../../hooks/appState";
import PaymentButton from "../../../components/PaymentButton";

const CartSummary = ({ cart, refetch }) => {
    const { user } = useAppState();
    const [paymentKey, setPaymentKey] = useState({});
    const { mutate } = useApiMutation();

    // Calculate total price from cart items.
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    // Ensure a nonzero amount (Paystack requires a positive amount).
    const effectiveTotalPrice = totalPrice > 0 ? totalPrice : 1;

    // Create a config object for Paystack payment.
    // useMemo will update the config when paymentKey or effectiveTotalPrice changes.
    const config = useMemo(
        () => ({
            reference: new Date().getTime().toString(),
            email: "greenmousedev@gmail.com", // or use user.email if available.
            amount: effectiveTotalPrice * 100, // Amount in kobo.
            publicKey: paymentKey?.publicKey,
            currency: "NGN", // Specify the currency.
        }),
        [paymentKey, effectiveTotalPrice]
    );

    // Payment gateway key fetch function.
    const getPaymentKeys = () => {
        mutate({
            url: `/user/payment/gateway`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setPaymentKey(response.data.data.find((key) => key.isActive));
            },
            onError: (error) => {
                console.error("Error fetching payment keys:", error);
            },
        });
    };

    useEffect(() => {
        getPaymentKeys();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Callback when the payment is successful.
    const onSuccess = (reference) => {
        const payload = {
            refId: reference.reference,
            shippingAddress: typeof user.location === "string" ? `${JSON.parse(user.location).city} ${JSON.parse(user.location).state}, ${JSON.parse(user.location).country}`
                :
                `${user.location.city} ${user.location.state} ${user.location.state}`
        };
        mutate({
            url: "/user/checkout",
            method: "POST",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                refetch();
            },
            onError: (error) => {
            },
        });
    };

    // Callback when the payment modal is closed.
    const onClose = () => {
        console.log("Payment closed");
        // Handle modal closure if necessary.
    };

    return (
        <div className="w-full flex flex-col gap-2 py-4 rounded-lg bg-white">
            <div className="flex flex-col px-4 gap-4">
                <h1 className="text-lg font-semibold mb-6 mt-4 uppercase">CART Summary</h1>
            </div>
            <div className="w-full h-[1px] -mt-4 border-[1.5px]" />
            <div className="w-full flex flex-col px-4 gap-10">
                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex">
                        <span className="text-sm text-[rgba(178,178,178,1)]">
                            Item’s Total ({cart.length})
                        </span>
                    </div>
                    <div className="w-full flex justify-end">
                        <span className="text-sm text-[rgba(178,178,178,1)]">{totalPrice}</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] mt-1 border-[1.5px]" />
            <div className="flex justify-center mt-2 w-full">
                <PaymentButton disabled={cart.length === 0} config={config} user={user} onSuccess={onSuccess} onClose={onClose}>
                    <span className="text-sm font-[500] normal-case">
                        Checkout ₦{totalPrice}
                    </span>
                </PaymentButton>
            </div>
        </div>
    );
};

export default CartSummary;
