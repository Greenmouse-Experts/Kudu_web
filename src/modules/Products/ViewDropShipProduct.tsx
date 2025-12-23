import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiFactory";
import { useParams } from "react-router-dom";
import type { Product } from "../../types";
import ProductInfo from "./new_components/Carousel";
import PricingVariants from "./new_components/PricingVariants";
export default function ViewDropShipProducts() {
  const { id } = useParams();
  const query = useQuery<{ data: Product }>({
    queryKey: ["dropship-product-details", id],
    queryFn: async () => {
      let resp = await apiClient.get(`/product?productId=${id}`);
      return resp.data;
    },
  });
  if (query.isLoading) {
    return (
      <div
        data-theme="kudu"
        className="flex min-h-screen pt-28 px-3 container mx-auto justify-center items-center"
      >
        <div>
          <span className="loading loading-ball"></span>
          <span>Loading</span>
        </div>
      </div>
    );
  }
  return (
    <div
      data-theme="kudu"
      className="flex min-h-screen pt-28 px-3 container mx-auto bg-base-200"
    >
      <section className="flex-1 p-4 ">
        <ProductInfo product={query.data?.data} />
        {/*{JSON.stringify(query.data, null, 2)}*/}
      </section>
      <div className="flex-1 max-w-md bg-base-200">
        <PricingVariants product={query.data?.data} />
      </div>
    </div>
  );
}
