import { Query, useQuery } from "@tanstack/react-query";
import { ModalHandle } from "../../../../components/dialogs-modals/SimpleModal";
import apiClient from "../../../../api/apiFactory";
import QueryCage from "../../../../components/query/QueryCage";
import DropshipHeader from "./Header";
import { Button } from "@material-tailwind/react";
import StoreCard from "./StoreCard";

interface Store {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    address: string;
    country: string;
  };
  businessHours: {
    sunday: string;
    saturday: string;
    monday_friday: string;
  };
  tipsOnFinding: string;
  logo: string;
  isVerified: boolean;
  currency: {
    symbol: string;
  };
}

export default function AddToStore(props: any) {
  const query = useQuery({
    queryKey: ["store-list"],
    queryFn: async () => {
      let resp = await apiClient.get("/stores", {
        params: {
          limit: 30,
          offset: 0,
        },
      });
      return resp.data;
    },
  });
  return (
    <div className="" data-theme="kudu">
      <DropshipHeader />
      <div className="p-4 text-xl font-bold">Import to Store</div>
      <div className="p-4">
        <QueryCage query={query}>
          {(data: any) => {
            let stores: Store[] = data.data;
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stores.map((item: Store) => {
                  return <StoreCard item={item} key={item.id} />;
                })}
              </div>
            );
          }}
        </QueryCage>
      </div>
    </div>
  );
}

const StoreDetails = () => {
  return (
    <>
      <div>Store Details</div>
    </>
  );
};
