import { useQuery } from "@tanstack/react-query";
import { useCountrySelect } from "../../../../store/clientStore";
import apiClient from "../../../../api/apiFactory";
import { Link } from "react-router-dom";
import ProductListing from "../../../../components/ProductsList";
import { useModal } from "../../../../hooks/modal";
import Loader from "../../../../components/Loader";
import AdsComp from "./AdsComp";

export default function NewProductSection() {
  const { country } = useCountrySelect();
  const { data, isLoading } = useQuery({
    queryKey: ["products-home", country.value],
    queryFn: async () => {
      let resp = await apiClient.get("/products", {
        params: {
          country: country.value,
        },
      });
      return resp.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  const new_products = data?.data || [];
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="bg-[#C1FFA5] flex justify-between p-6 rounded-md mb-10 cursor-pointer">
          <h2 className="text-lg font-semibold">All Products</h2>
          <Link to={"/see-all"} className="text-black font-semibold">
            See All
          </Link>
        </div>

        <ProductListing productsArr={new_products?.slice(0, 12)} displayError />
        <AdsComp />
        <ProductListing
          productsArr={new_products
            ?.filter((item) => item.condition == "brand_new")
            .slice(12, 24)}
        />
      </div>
    </div>
  );
}
