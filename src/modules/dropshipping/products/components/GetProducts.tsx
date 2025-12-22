import { useQuery } from "@tanstack/react-query";
import { useSingleSelect } from "../../../../helpers/selectors";
import apiClient from "../../../../api/apiFactory";
import QueryCage from "../../../../components/query/QueryCage";
import { type AliResponse } from "../../ali";
import AliProductCard from "./ProductCard";

interface AliExpressProduct {
  originalPrice: string;
  originalPriceCurrency: string;
  salePrice: string;
  discount: string;
  itemMainPic: string;
  title: string;
  type: string;
  score: string;
  itemId: string;
  targetSalePrice: string;
  targetOriginalPriceCurrency: string;
  evaluateRate: string;
  orders: string;
  targetOriginalPrice: string;
  itemUrl: string;
  salePriceCurrency: string;
}

interface AliExpressProductsResponse {
  aliexpress_ds_text_search_response: {
    code: string;
    data: {
      pageIndex: number;
      pageSize: number;
      totalCount: number;
      products: {
        selection_search_product: AliExpressProduct[];
      };
    };
    request_id: string;
    _trace_id_: string;
  };
}

export default function GetDropShipProducts({
  selectProps,
}: {
  selectProps: ReturnType<typeof useSingleSelect<number>>;
}) {
  const query = useQuery({
    queryKey: ["ali-products", selectProps.selectedItem],
    queryFn: async () => {
      let resp = await apiClient.get<AliResponse<AliExpressProductsResponse>>(
        "admin/aliexpress/products?shippingCountry=UK&currency=USD",
        {
          params: {
            categoryId: selectProps.selectedItem,
          },
        },
      );
      return resp.data;
    },
    enabled:
      selectProps.selectedItem !== undefined &&
      selectProps.selectedItem !== null,
  });
  return (
    <section className="min-h-screen" data-theme="kudu">
      {/*{selectProps.selectedItem}*/}
      <QueryCage query={query}>
        {(data) => {
          return (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
              {data.data.aliexpress_ds_text_search_response.data.products.selection_search_product.map(
                (item) => {
                  return (
                    <>
                      <AliProductCard item={item} key={item.itemId} />
                    </>
                  );
                },
              )}
            </div>
          );
        }}
      </QueryCage>
    </section>
  );
}
