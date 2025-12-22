import { useQuery } from "@tanstack/react-query";
import { useSingleSelect } from "../../../../helpers/selectors";
import apiClient from "../../../../api/apiFactory";
import QueryCage from "../../../../components/query/QueryCage";

export default function GetDropShipProducts({
  selectProps,
}: {
  selectProps: ReturnType<typeof useSingleSelect<number>>;
}) {
  const query = useQuery({
    queryKey: ["ali-products", selectProps.selectedItem],
    queryFn: async () => {
      let resp = await apiClient.get(
        "admin/aliexpress/products?shippingCountry=NGN&currency=NGN",
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
    <section className="min-h-screen">
      <QueryCage query={query}>
        {(data) => {
          return <>{JSON.stringify(data, null, 2)}</>;
        }}
      </QueryCage>
    </section>
  );
}
