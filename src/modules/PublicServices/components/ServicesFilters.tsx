import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";

interface MainCategory {
  id: string;
  image: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  // subCategories?: SubCategory[]; // Not used for this fix
}

interface API_Response {
  data: MainCategory[];
}

export default function ServiceFilters() {
  const query = useQuery<API_Response>({
    queryKey: ["public-categories"],
    queryFn: async () => {
      let resp = await apiClient.get("/categories");
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <div className="p-4">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="p-4">
        <div className="alert alert-error">Error loading filters</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-2">
            {query.data?.data.map((category) => (
              <div key={category.id}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm">{category.name}</span>
                </label>
                {/* No subcategory UI, as per prompt */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
