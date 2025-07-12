import { useMemo } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import useAppState from "../../../hooks/appState";
import PaymentButton from "../../../components/PaymentButton";
import { useGeoLocatorCurrency } from "../../../hooks/geoLocatorProduct";
import { Button } from "@material-tailwind/react";
import AddShippingAddress from "../../../components/AddShippingAddress";
import { useModal } from "../../../hooks/modal";
import { Country } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import { paystackKey } from "../../../config/paymentKeys";
import DollarPaymentButton from "../../../components/DollarPaymentButton";
import { formatNumberWithCommas } from "../../../helpers/helperFactory";

const CartSummary = ({ cart, refetch }) => {
  const currency = useGeoLocatorCurrency();
  const { user } = useAppState();
  // const [paymentKey, setPaymentKey] = useState({});
  const { mutate } = useApiMutation();
  const { openModal, closeModal } = useModal();

  const { ipInfo } = useAppState();

  const navigate = useNavigate();

  const paymentKey = paystackKey;

  const countries = Country.getAllCountries();

  const handleModal = () => {
    openModal({
      size: "sm",
      content: (
        <AddShippingAddress
          isOpen={true}
          countries={countries}
          closeModal={handleCloseModal}
        />
      ),
    });
  };

  const handleCloseModal = () => {
    closeModal();
    refetch();
  };

  // Calculate total price from cart items.
  const totalPrice = cart.reduce((sum, item) => {
    if (item.product.quantity <= 0) return sum;

    const price =
      parseFloat(item.product.discount_price) > 0 &&
      parseFloat(item.product.discount_price) < parseFloat(item.product.price)
        ? parseFloat(item.product.discount_price)
        : parseFloat(item.product.price);

    return sum + item.quantity * price;
  }, 0);

  // Calculate Paystack charges (1.5% + ₦100 for local transactions)
  const calculatePaystackCharges = (amount) => {
    if (amount <= 0) return 0;
    
    const percentageCharge = amount * 0.015; // 1.5%
    const fixedCharge = 100; // ₦100
    const totalCharge = percentageCharge + fixedCharge;
    
    // Paystack caps charges at ₦2,000 for transactions above ₦2,500
    const cappedCharge = amount > 2500 ? Math.min(totalCharge, 2000) : totalCharge;
    
    return Math.round(cappedCharge); // Round to nearest naira
  };

  const paystackCharges = calculatePaystackCharges(totalPrice);
  const totalWithCharges = totalPrice + paystackCharges;

  // Ensure a nonzero amount (Paystack requires a positive amount).
  const effectiveTotalPrice = totalWithCharges > 0 ? totalWithCharges : 1;

  // Create a config object for Paystack payment.
  // useMemo will update the config when paymentKey or effectiveTotalPrice changes.
  const config = useMemo(
    () => ({
      reference: new Date().getTime().toString(),
      email: user?.email || "user@example.com", // Use actual user email
      amount: effectiveTotalPrice * 100, // Amount in kobo.
      publicKey: paymentKey,
      currency: "NGN", // Specify the currency.
    }),
    [paymentKey, effectiveTotalPrice, user?.email]
  );

  // Payment gateway key fetch function.
  /* const getPaymentKeys = () => {
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
     }, []); */

  // Callback when the payment is successful.
  const onSuccess = (reference) => {
    const location =
      typeof user.location !== "string"
        ? [user.location.city, user.location.state, user.location.country]
            .filter(Boolean) // Removes falsy values (null, undefined, empty string)
            .join(" ")
        : null;
    const payload = {
      refId: reference.reference,
      shippingAddress:
        typeof user.location === "string"
          ? `${JSON.parse(user.location).city} ${
              JSON.parse(user.location).state
            }, ${JSON.parse(user.location).country}`
          : `${location}`,
    };
    mutate({
      url: "/user/checkout",
      method: "POST",
      data: payload,
      headers: true,
      onSuccess: (response) => {
        navigate("/profile/orders");
      },
      onError: (error) => {},
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
        <h1 className="text-lg font-semibold mb-6 mt-4 uppercase">
          CART Summary
        </h1>
      </div>
      <div className="w-full h-[1px] -mt-4 border-[1.5px]" />
      <div className="w-full flex flex-col px-4 gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex">
            <span className="text-sm text-[rgba(178,178,178,1)]">
              Item's Total (
              {cart.filter((item) => item.product.quantity > 0).length})
            </span>
          </div>
          <div className="w-full flex justify-end">
            <span className="text-sm text-[rgba(178,178,178,1)]">
              {currency[0].symbol}
              {totalPrice.toLocaleString("en-US")}
            </span>
          </div>
        </div>
        
        {ipInfo.currency_name === "Naira" && totalPrice > 0 && (
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex">
              <span className="text-sm text-[rgba(178,178,178,1)]">
                Charges
              </span>
            </div>
            <div className="w-full flex justify-end">
              <span className="text-sm text-[rgba(178,178,178,1)]">
                ₦{paystackCharges.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        )}
        
        {totalPrice > 0 && (
          <div className="w-full flex justify-between items-center border-t pt-2">
            <div className="w-full flex">
              <span className="text-base font-semibold text-black">
                Total
              </span>
            </div>
            <div className="w-full flex justify-end">
              <span className="text-base font-semibold text-black">
                {currency[0].symbol}
                {(ipInfo.currency_name === "Naira" ? totalWithCharges : totalPrice).toLocaleString("en-US")}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-[1px] mt-1 border-[1.5px]" />
      {user.location && (
        <>
          <span className="flex justify-between">
            <p className="text-sm px-4 mt-2 font-semibold">Delivery Address</p>
            <span
              onClick={handleModal}
              className="text-kuduOrange cursor-pointer mt-2 px-4 font-[500] underline"
            >
              Change Location
            </span>
          </span>
          <p className="text-base px-4 text-[rgba(178,178,178,1)]">
            {user.location.city} {user.location.state}, {user.location.country}
          </p>
        </>
      )}
      <div className="flex justify-center mt-3 w-full">
        {user.location ? (
          ipInfo.currency_name === "Naira" ? (
            <PaymentButton
              disabled={cart.length === 0}
              config={config}
              user={user}
              onSuccess={onSuccess}
              onClose={onClose}
            >
              <span className="text-sm font-[500] normal-case">
                Checkout ₦{formatNumberWithCommas(totalWithCharges)}
              </span>
            </PaymentButton>
          ) : (
            <DollarPaymentButton amount={totalPrice}>
              <span className="text-sm font-[500] normal-case">
                Checkout ${formatNumberWithCommas(totalPrice)}
              </span>
            </DollarPaymentButton>
          )
        ) : (
          <Button className="bg-kuduOrange" onClick={handleModal}>
            Set Delivery Location
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
