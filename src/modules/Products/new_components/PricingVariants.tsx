import { toast } from "react-toastify";
import { Product } from "../../../types";
import { useState } from "react";

const PricingVariants = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="p-4 ring ring-current/20 bg-base-100 rounded-box">
      <h3 className="text-lg font-semibold">PRICING</h3>
      <p className="text-2xl font-bold text-primary">
        {selectedVariant?.currency_code} {selectedVariant?.sku_price}
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
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="input input-bordered w-20 text-center"
        />
      </div>
      <button
        onClick={() => {
          toast.info("Coming Soon");
        }}
        className="btn btn-primary btn-block mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default PricingVariants;
