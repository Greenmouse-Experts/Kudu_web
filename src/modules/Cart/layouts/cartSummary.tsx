import { useEffect, useMemo } from "react";
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
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { DropShipNairaPayment } from "../_components/DropShipNairaPyment";
// Define the structure of a product charge.
interface ProductCharge {
  id: number;
  name: string;
  description: string;
  calculation_type: "fixed" | "percentage";
  charge_currency: string;
  charge_amount: string | null;
  charge_percentage: string | null;
  minimum_product_amount: string;
  maximum_product_amount: string | null;
}

// Define the structure of the API response for product charges.
interface ProductChargesResponse {
  message: string;
  data: ProductCharge[];
}
// Define the structure for the user object within a product's store.
interface StoreCurrency {
  name: string;
  symbol: string;
}

// Define the structure for the store object within a product.
interface ProductStore {
  name: string;
  currency: StoreCurrency;
}

// Define the structure for a product object within a cart item.
interface ProductItem {
  additional_images: string[];
  id: string;
  vendorId: string;
  storeId: string;
  categoryId: string;
  name: string;
  sku: string;
  condition: string;
  description: string;
  specification: string;
  quantity: number;
  price: string;
  discount_price: string;
  image_url: string;
  video_url: string | null;
  warranty: string;
  return_policy: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  views: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  store: ProductStore;
}

// Define the structure for a user object within a cart item.
interface UserItem {
  location: any[]; // Placeholder for location structure, adjust if more specific details are known
  isVerified: boolean;
  id: string;
  trackingId: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  email: string;
  email_verified_at: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  photo: string | null;
  fcmToken: string;
  wallet: string | null;
  dollarWallet: string;
  facebookId: string | null;
  googleId: string | null;
  accountType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Define the structure for a single cart item.
interface CartItemData {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  user: UserItem;
  product: ProductItem;
}

// Define the structure for the API response containing cart items.
interface CartResponseData {
  data: CartItemData[];
}
// Define the structure for the user object within a cart item.
interface UserInCart {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: any; // Placeholder for location structure, adjust if more specific details are known
  isVerified: boolean;
  googleId: string | null;
  accountType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  photo: string | null;
  fcmToken: string;
  wallet: string | null;
  dollarWallet: string;
  facebookId: string | null;
  gender: string | null;
  trackingId: string | null;
  dateOfBirth: string | null;
}

// Define the structure for the currency object within a product's store.
interface Currency {
  name: string;
  symbol: string;
}

// Define the structure for the store object within a product.
interface Store {
  name: string;
  currency: Currency;
}

// Define the structure for a product object within a cart item.
interface Product {
  additional_images: string[];
  id: string;
  vendorId: string;
  storeId: string;
  categoryId: string;
  name: string;
  sku: string;
  condition: string;
  description: string;
  specification: string;
  quantity: number;
  price: string;
  discount_price: string;
  image_url: string;
  video_url: string | null;
  warranty: string;
  return_policy: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  views: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  store: Store;
}

// Define the structure for a single cart item.
interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  user: UserInCart;
  product: Product;
}

// Define the structure for the API response containing cart items.

export interface CartSummaryType {
  cart: CartItem[];
  [key: string]: any;
}
const CartSummary = ({ cart, refetch }: CartSummaryType) => {
  const currency = useGeoLocatorCurrency();

  const { user } = useAppState();
  const query = useQuery<ProductChargesResponse>({
    queryKey: ["charges", cart],
    queryFn: async () => {
      let resp = await apiClient.get("/user/cart/charges");
      console.log(resp.data, "data");
      return resp.data;
    },
  });
  // const [paymentKey, setPaymentKey] = useState({});
  useEffect(() => {
    console.log(cart);
  }, []);
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
  const charges = query.data?.data;
  const item_amounts = cart.map((cart_items) => {
    const quantity = cart_items.quantity;
    const discount = parseFloat(cart_items.product.discount_price);
    const basePrice =
      discount != 0 ? discount : parseFloat(cart_items.product.price);
    console.log(basePrice, "price");
    const initial_price = basePrice * quantity; // Calculate total for this item without charges

    // Early return if charges are not available
    if (!charges || charges?.length < 1) {
      return {
        full_price: initial_price,
        base_price: initial_price,
        charge_amount: 0,
        cart_items,
      };
    }
    console.log(charges, "ss");

    // Find the appropriate charge based on quantity
    const charge = charges?.find((char) => {
      const minAmount = parseFloat(char.minimum_product_amount);
      const maxAmount = char.maximum_product_amount
        ? parseFloat(char.maximum_product_amount)
        : null;

      // Base price should be >= minimum
      const meetsMinimum = basePrice >= minAmount;

      // If there's a maximum, base price should be <= maximum
      // If no maximum, then any price above minimum is valid
      const meetsMaximum = maxAmount ? basePrice <= maxAmount : true;

      return meetsMinimum && meetsMaximum;
    });

    if (!charge) {
      return {
        full_price: initial_price,
        base_price: initial_price,
        charge_amount: 0,
        cart_items,
      };
    }

    let price;
    let chargeAmount = 0;

    if (charge.calculation_type === "fixed") {
      // Fixed charge: add the charge amount to base price, then multiply by quantity
      chargeAmount = parseFloat(charge.charge_amount) * quantity;
      price = (basePrice + parseFloat(charge.charge_amount)) * quantity;
    } else if (charge.calculation_type === "percentage") {
      // Percentage charge: calculate percentage of base price per unit, then multiply by quantity
      const percentagePerUnit =
        (basePrice * parseFloat(charge.charge_percentage)) / 100;
      chargeAmount = percentagePerUnit * quantity;
      price = (basePrice + percentagePerUnit) * quantity;
    } else {
      // Fallback: just use base price if calculation type is unknown
      price = initial_price;
      chargeAmount = 0;
    }

    return {
      full_price: price,
      base_price: initial_price,
      charge_amount: chargeAmount,
      cart_items,
    };
  });
  console.log(charges);

  const total_price = item_amounts.reduce((total, item) => {
    return total + (item.full_price || 0);
  }, 0);
  const total_price_without_charges = cart.reduce((total, cart_item) => {
    const basePrice = parseFloat(cart_item.product.discount_price);
    const quantity = cart_item.quantity;
    return total + basePrice * quantity;
  }, 0);

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

  const onClose = () => {
    console.log("Payment closed");
    // Handle modal closure if necessary.
  };

  if (query.isFetching)
    return (
      <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg bg-white py-6">
        <div className="animate-spin  text-xl font-bold opacity-80">...</div>
      </div>
    );

  if (query.isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg bg-white py-6">
        <div>
          <div className="">Error Loading Checkout Info</div>
          <button
            onClick={() => query.refetch}
            className="bg-kudu-orange text-white font-bold py-2 px-4 rounded-sm hover:bg-kuduDarkOrange focus:outline-hidden focus:ring-2 focus:ring-kuduDarkOrange"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  const charges_total = total_price - total_price_without_charges;

  // return <></>;
  return (
    <div
      className="card w-full bg-base-100 shadow-sm rounded-lg"
      data-theme="kudu"
    >
      <div className="card-body p-4 gap-2">
        <h2 className="card-title text-lg font-semibold uppercase mb-2">
          CART Summary
        </h2>

        <div className="divider my-0"></div>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-base-content/60">
              Item's Total (
              {
                item_amounts.filter(
                  (item) => item.cart_items.product.quantity > 0,
                ).length
              }
              )
            </span>
            <span className="text-sm text-base-content/60">
              {currency[0].symbol}
              {total_price.toLocaleString("en-US")}
            </span>
          </div>

          {ipInfo.currency_name === "Naira" && total_price > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/60">Charges</span>
              <span className="text-sm text-base-content/60">
                ₦{charges_total.toLocaleString("en-US")}
              </span>
            </div>
          )}

          {total_price > 0 && (
            <div className="flex justify-between items-center border-t border-base-200 pt-3">
              <span className="text-base font-bold">Total</span>
              <span className="text-base font-bold">
                {currency[0].symbol}
                {(ipInfo.currency_name === "Naira"
                  ? total_price
                  : total_price_without_charges
                ).toLocaleString("en-US")}
              </span>
            </div>
          )}
        </div>

        <div className="divider my-0"></div>

        {user.location && (
          <div className="py-2">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-semibold">Delivery Address</p>
              <button
                onClick={handleModal}
                className="btn btn-link btn-xs text-kudu-orange no-underline hover:underline p-0 min-h-0 h-auto"
              >
                Change Location
              </button>
            </div>
            <p className="text-sm text-base-content/60">
              {user.location.city} {user.location.state},{" "}
              {user.location.country}
            </p>
          </div>
        )}

        <div className="card-actions justify-center mt-4">
          {user.location ? (
            ipInfo.currency_name === "Naira" ? (
              <div data-theme="kudu" className="w-full">
                <DropShipNairaPayment
                  total_price={total_price}
                  paymentKey={paymentKey}
                ></DropShipNairaPayment>
              </div>
            ) : (
              <DollarPaymentButton
                amount={total_price}
                noWidth={false}
                bgColor="bg-kudu-orange"
                onSuccess={onSuccess}
              >
                <span className="text-sm font-medium normal-case">
                  Checkout ${formatNumberWithCommas(total_price)}
                </span>
              </DollarPaymentButton>
            )
          ) : (
            <button
              className="btn bg-kudu-orange hover:bg-kudu-orange/90 border-none text-white w-full"
              onClick={handleModal}
            >
              Set Delivery Location
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
