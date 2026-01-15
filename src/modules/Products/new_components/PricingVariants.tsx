import { toast } from "react-toastify";
import { Product } from "../../../types";
import { useState } from "react";
import { useAddToCart } from "../../../api/cart";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { ChartItem } from "chart.js";
import { useCountrySelect } from "../../../store/clientStore";
import useAppState from "../../../hooks/appState";
import { toast as tst } from "sonner";

const PricingVariants = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAppState();
  const user_location = user?.["location"] as
    | {
        city: string;
        state: string;
        country: string;
      }
    | undefined;

  const isNigerian = user_location?.country === "Nigeria";

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };
  interface CartItem {
    product_id: string;
    [key: string]: any;
    quantity: number;
    dropshipProductSkuAttr: string; // gotten from dropship type products variants array
    dropshipProductSkuId: string; // gotten from dropship type products variants array
  }
  const mutation = useMutation({
    mutationFn: async (data: CartItem) => {
      let resp = await apiClient.post("user/cart/add", data);
      return resp.data;
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    } else {
      setQuantity(0);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  //@ts-ignore
  const calculatedPrice = selectedVariant
    ? //@ts-ignore
      selectedVariant.sku_price * quantity
    : 0;

  const handleAddToCart = () => {
    if (!user) return tst.error("login in to continue");
    if (quantity <= 0) return tst.error("Please select a valid quantity");
    // if (isNigerian) {
    //   toast.error("Adding to cart is not available in Nigeria at this time.");
    //   return;
    // }

    //@ts-ignore
    //
    tst.promise(
      mutation.mutateAsync({
        productId: product.id as string,
        product_id: product.id as string,
        quantity,
        dropshipProductSkuAttr: selectedVariant?.sku_attr,
        dropshipProductSkuId: selectedVariant?.sku_id,
      }),
      {
        loading: "Adding to cart...",
        success: "Added to cart!",
        error: (err) => {
          console.log(err, "err");
          return err["response"]["data"]["message"] || "failed to add to cart";
        },
      },
    );
  };

  return (
    <div className="p-4 ring ring-current/20 bg-base-100 rounded-box ">
      <div className="flex gap-2 mb-2">
        {/*<div className="badge badge-info badge-soft ring">Coming Soon</div>*/}
        <div className="badge badge-error badge-soft ring">Not Available</div>
      </div>
      <h3 className="text-lg font-semibold">PRICING</h3>
      <p className="text-2xl font-bold text-primary">
        {selectedVariant?.currency_code} {calculatedPrice.toFixed(2)}
      </p>

      {product.variants.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Variants:</h4>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                className={`btn ${
                  selectedVariant?.id === variant.id
                    ? "btn-primary"
                    : "btn-outline"
                }`}
                onClick={() => handleVariantChange(variant.id)}
              >
                {variant.aeop_s_k_u_propertys
                  .map((prop) => prop.sku_property_value)
                  .join(" / ")}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        <label htmlFor="quantity" className="font-semibold">
          Quantity:
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={decrementQuantity}
            className="btn btn-square btn-outline btn-sm"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
            className="input input-bordered w-20 text-center mx-2"
          />
          <button
            type="button"
            onClick={incrementQuantity}
            className="btn btn-square btn-outline btn-sm"
          >
            +
          </button>
        </div>
      </div>
      {/*{user_location.country}*/}
      <button
        onClick={() => {
          handleAddToCart();
          // toast.info("Coming Soon");
        }}
        disabled={product.quantity <= 0}
        className="btn btn-primary btn-block mt-2"
      >
        Add to Cart
      </button>
      <div className="p-4 ring ring-current/20 bg-base-100 rounded-box mt-4">
        <h3 className="text-lg font-bold mb-2">Safety Tips</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Meet with the seller at a safe public place.</li>
          <li>Inspect the item and ensure it's exactly what you want</li>
          <li>Make sure that the packed item is the one you've inspected</li>
        </ul>
      </div>
    </div>
  );
};

export default PricingVariants;
