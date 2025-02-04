import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("kuduUserToken");

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

export const storeSlice = createApi({
  reducerPath: "store",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  tagTypes: ["Stores"],

  endpoints: (builder) => {
    return {
     getAllStore: builder.query({
        query: () => ({
            url: `/vendor/store`,
            method: "GET",
            headers: { ...headers },
        }),
        providesTags: ["Stores"],
      }),
          
      getSingleStore: builder.query({
        query: (storeId) => ({
          url: `/vendor/view/store?storeId=${storeId}`,
          method: "GET",
          headers: { ...headers },
        }),
        providesTags: ["Stores"],
      }),

      createStore: builder.mutation({
        query: (data) => ({
          url: `/vendor/store`,
          method: "POST",
          headers: { ...headers },
          body: data,
        }),
        invalidatesTags: ["Stores"],
      }),

      createProduct: builder.mutation({
        query: (data) => ({
          url: `/vendor/products`,
          method: "POST",
          headers: { ...headers },
          body: data,
        }),
        invalidatesTags: ["Stores"],
      }),

      editStore: builder.mutation({
        query: (storeId) => {
            return{
              url: `/vendor/store?storeId=${storeId}`,
              method: "PUT",
              headers: { ...headers },
              body: data,
            }
        },
        invalidatesTags: ["Stores"],
      }),

      deleteStore: builder.mutation({
        query: (storeId) => ({
          url: `/vendor/store?storeId=${storeId}`,
          method: "DELETE",
          headers: { ...headers },
        }),
        invalidatesTags: ["Stores"],
      }),

      getCurrencies: builder.query({
        query: () => ({
            url: `/vendor/currencies`,
            method: "GET",
            headers: { ...headers },
        }),
        providesTags: ["Stores"],
      }),

      getMyProduct: builder.query({
        query: () => ({
            url: `/vendor/vendors/products`,
            method: "GET",
            headers: { ...headers },
        }),
        providesTags: ["Stores"],
      }),

      getCountries: builder.query({
        query: () => ({
            url: "https://countriesnow.space/api/v0.1/countries/states",
            method: "GET",
            headers: { ...headers },
        }),
        providesTags: ["Stores"],
      }),

      getCategories: builder.query({
        query: () => ({
            url: `/categories/with/sub-categories`,
            method: "GET",
            headers: { ...headers },
        }),
        providesTags: ["Stores"],
      }),

    };
  },
});

export const {
  useGetAllStoreQuery,
  useGetSingleStoreQuery,
  useCreateStoreMutation,
  useCreateProductMutation,
  useEditStoreMutation,
  useDeleteStoreMutation,
  useGetCurrenciesQuery,
  useGetCountriesQuery,
  useGetCategoriesQuery,
  useGetMyProductQuery
} = storeSlice;
