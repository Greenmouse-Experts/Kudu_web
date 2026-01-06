import "./style.css";
import { useState, useMemo } from "react";
import { ShoppingBag, Package, RefreshCcw } from "lucide-react";
import ProductListing from "../../../components/ProductsList";
import { useCountrySelect } from "../../../store/clientStore";
import apiClient from "../../../api/apiFactory";
import { useQuery } from "@tanstack/react-query";

export default function ProductConditions() {
  const { country } = useCountrySelect();

  const { data: new_products } = useQuery({
    queryKey: ["products-home-condition", country.value],
    queryFn: async () => {
      let resp = await apiClient.get("/products", {
        params: {
          country: country.value,
        },
      });
      return resp.data;
    },
  });

  const conditionsArr = [
    {
      name: "Brand New",
      id: "brand_new",
      icon: ShoppingBag,
      color: "#FF5733",
    },
    {
      name: "Refurbished",
      id: "refurbished",
      icon: RefreshCcw,
      color: "#FF5733",
    },
    {
      name: "Used",
      id: "fairly_used",
      icon: Package,
      color: "#FF5733",
    },
  ];

  const [activeCondition, setActiveCondition] = useState("brand_new");

  const filteredProducts = useMemo(() => {
    const products = new_products?.data || [];
    return products.filter((product) => product.condition === activeCondition);
  }, [new_products, activeCondition]);

  const handleActiveCondition = (id) => {
    setActiveCondition(id);
  };

  return (
    <div className="flex w-full flex-col lg:gap-5 md:gap-5 mb-10">
      <div className="grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-3 my-3 md:mt-3 lg:mt-0 gap-4">
        {conditionsArr.length > 0 ? (
          conditionsArr.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeCondition === item.id;

            return (
              <div
                key={index}
                onClick={() => handleActiveCondition(item.id)}
                className={`group flex flex-col gap-4 py-3 md:py-5 justify-center items-center cursor-pointer rounded-lg shadow-sm transition-all
                                ${isActive ? "bg-kudu-orange text-white" : "bg-white text-black hover:bg-kudu-orange hover:text-white"}
                            `}
              >
                <IconComponent
                  size={40}
                  className="transition-all hidden md:block"
                  style={{ color: isActive ? "white" : item.color }}
                />
                <IconComponent
                  size={20}
                  className="transition-all block md:hidden"
                  style={{ color: isActive ? "white" : item.color }}
                />
                <p className="lg:text-sm md:text-sm text-xs font-medium">
                  {item.name}
                </p>
              </div>
            );
          })
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-2xl font-semibold">NO DATA IS AVAILABLE</span>
          </div>
        )}
      </div>

      <ProductListing productsArr={filteredProducts} displayError />
    </div>
  );
}
