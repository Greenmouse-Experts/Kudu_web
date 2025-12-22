import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "../../../../api/apiFactory";
import QueryCage from "../../../../components/query/QueryCage";
import useSelectItem, { useSingleSelect } from "../../../../helpers/selectors";

interface Category {
  category_name: string;
  category_id: number;
  parent_category_id?: number;
}

interface CategoriesResponse {
  data: {
    category: Category[];
  };
}

export default function AliCategories(props: {
  selectProps: ReturnType<typeof useSingleSelect<number>>;
}) {
  const query = useQuery<CategoriesResponse>({
    queryKey: ["ali-categories"],
    queryFn: async () => {
      let resp = await apiClient.get("admin/aliexpress/categories");
      return resp.data;
    },
  });
  const { selectProps } = props;
  return (
    <section data-theme="kudu" className="w-2xs bg-base-200">
      <h2 className="px-4 w-2xs border-b border-b-current/20  h-14 flex items-center text-xl font-bold">
        Categories
      </h2>
      <QueryCage
        customLoadingComponent={
          <>
            <div className="w-2xs flex-1 min-h-screen p-4">
              <span className="loading loading-ball"></span>Loading
            </div>
          </>
        }
        query={query}
      >
        {(data) => {
          const categories = data.data.category;
          const parentCategories = categories.filter(
            (cat) => cat.parent_category_id === undefined,
          );
          // const subCategories = categories.filter(
          //   (cat) => cat.parent_category_id !== undefined,
          // );
          return (
            <div className="w-2xs">
              <ul className="menu w-full bg-base-200 space-y-2 py-4">
                {parentCategories.map((item) => {
                  const setSelected = () => {
                    selectProps.selectItem(item.category_id);
                  };
                  if (selectProps.selectedItem == item.category_id) {
                    return (
                      <>
                        <li>
                          <a className="menu-active">{item.category_name}</a>
                        </li>
                      </>
                    );
                  }
                  return (
                    <>
                      <li>
                        <a onClick={() => setSelected()} className="">
                          {item.category_name}
                        </a>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          );
        }}
      </QueryCage>
    </section>
  );
}
