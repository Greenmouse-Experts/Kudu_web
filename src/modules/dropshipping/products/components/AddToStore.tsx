import { Query, useQuery } from "@tanstack/react-query";
import apiClient from "../../../../api/apiFactory";
import QueryCage from "../../../../components/query/QueryCage";
import DropshipHeader from "./Header";
import StoreCard from "./StoreCard";
import { useCountrySelect } from "../../../../store/clientStore";
import { useParams } from "react-router-dom";
import {
  NewPaginator,
  use_new_paginate,
} from "../../../../components/paginate/NewPaginator";

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
  const currency = useCountrySelect();
  const paginate = use_new_paginate();

  const query = useQuery({
    queryKey: ["store-list", currency.country, paginate.page],
    queryFn: async () => {
      let resp = await apiClient.get("/stores", {
        params: {
          country: currency.country,
          limit: 30,
          name: "dandy",
          search: "Gbless",
          offset: 0,
          page: paginate.page,
        },
      });
      return resp.data;
    },
  });
  const { itemId } = useParams();
  return (
    <div className="" data-theme="kudu">
      <DropshipHeader showTitle={true} />
      <div className="p-4 text-xl font-bold">
        Import Item To Store: #{itemId}
      </div>
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
        {/*{JSON.stringify(query.data.pagination.total)}*/}
        <div className="my-3">
          <NewPaginator paginate={paginate} />
        </div>
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
