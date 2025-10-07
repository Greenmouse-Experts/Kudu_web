import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../../api/apiFactory";

interface MainCategory {
  id: string;
  image: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  categoryId: string;
  image: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface API_Response {
  data: MainCategory[];
}

export default function ServiceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Applied filters from URL
  const selectedCategory = searchParams.get("categoryId");
  const selectedSubcategory = searchParams.get("subcategoryId");

  // Local state for staged filters
  const [stagedCategory, setStagedCategory] = useState<string | null>(
    selectedCategory || null,
  );
  const [stagedSubcategory, setStagedSubcategory] = useState<string | null>(
    selectedSubcategory || null,
  );

  // Sync staged filters with URL params on refresh or navigation
  useEffect(() => {
    setStagedCategory(selectedCategory || null);
    setStagedSubcategory(selectedSubcategory || null);
  }, [selectedCategory, selectedSubcategory]);

  const query = useQuery<API_Response>({
    queryKey: ["public-categories"],
    queryFn: async () => {
      let resp = await apiClient.get("/categories/with/sub-categories");
      return resp.data;
    },
  });

  // Apply filters to URL search params
  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    if (stagedCategory) {
      newParams.set("categoryId", stagedCategory);
      // If stagedSubcategory is valid for this category, set it
      if (stagedSubcategory) {
        newParams.set("subcategoryId", stagedSubcategory);
      } else {
        newParams.delete("subcategoryId");
      }
    } else {
      newParams.delete("categoryId");
      newParams.delete("subcategoryId");
    }
    setSearchParams(newParams);
  };

  // Clear staged and applied filters
  const clearFilters = () => {
    setStagedCategory(null);
    setStagedSubcategory(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("categoryId");
    newParams.delete("subcategoryId");
    setSearchParams(newParams);
  };

  // When category changes, clear subcategory
  const handleCategoryChange = (categoryId: string) => {
    if (stagedCategory === categoryId) {
      setStagedCategory(null);
      setStagedSubcategory(null);
    } else {
      setStagedCategory(categoryId);
      setStagedSubcategory(null);
    }
  };

  // Only allow subcategory selection if category is selected
  const handleSubCategoryChange = (subcategoryId: string) => {
    if (stagedSubcategory === subcategoryId) {
      setStagedSubcategory(null);
    } else {
      setStagedSubcategory(subcategoryId);
    }
  };

  // Detect if staged filters differ from applied filters
  const isDirty =
    stagedCategory !== selectedCategory ||
    stagedSubcategory !== selectedSubcategory;

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
        {(selectedCategory || selectedSubcategory) && (
          <button
            onClick={clearFilters}
            className="btn btn-sm btn-ghost text-error"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-2">
            {query.data?.data.map((category) => (
              <div key={category.id}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={stagedCategory === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span className="text-sm">{category.name}</span>
                </label>

                {stagedCategory === category.id &&
                  category.subCategories.length > 0 && (
                    <div className="ml-6 mt-2 space-y-1">
                      <h5 className="text-xs font-medium text-base-content/70 mb-1">
                        Subcategories
                      </h5>
                      {category.subCategories.map((subcategory) => (
                        <label
                          key={subcategory.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="subcategory"
                            className="radio radio-xs"
                            checked={stagedSubcategory === subcategory.id}
                            onChange={() =>
                              handleSubCategoryChange(subcategory.id)
                            }
                            disabled={stagedCategory !== category.id}
                          />
                          <span className="text-xs">{subcategory.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <button
            className="btn btn-primary btn-block"
            onClick={applyFilters}
            disabled={!isDirty}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
