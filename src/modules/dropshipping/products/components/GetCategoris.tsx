import { useQuery } from "@tanstack/react-query";
import { useSingleSelect } from "../../../../helpers/selectors";
import apiClient from "../../../../api/apiFactory";
import QueryCage from "../../../../components/query/QueryCage";

export default function GetCategories(props: {
  //@ts-ignore
  selectProps: ReturnType<typeof useSingleSelect<string | null>>;
}) {
  const selectProps = props.selectProps;
  const query = useQuery({
    queryKey: ["ali-get-store-cate"],
    queryFn: async () => {
      let resp = await apiClient.get("categories", {
        params: {
          limit: 100,
        },
      });
      return resp.data;
    },
  });
  return (
    <div data-theme="kudu">
      <QueryCage query={query}>
        {(data) => {
          const payload = data.data;
          return (
            <ul className="menu">
              {payload.map((item) => {
                const selectItem = () => {
                  selectProps.selectItem(item.id);
                };
                if (selectProps.selectedItem == item.id) {
                  return (
                    <li>
                      <a className="menu-active">{item.name}</a>
                    </li>
                  );
                }
                return (
                  <li>
                    <a
                      onClick={() => {
                        selectItem();
                      }}
                      className=""
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          );
        }}
      </QueryCage>
    </div>
  );
}
