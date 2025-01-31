import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("kuduUserToken");
const type = "GetStore"

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

export const storeSlice = createApi({
  reducerPath: "store",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  tagTypes: [type],

  endpoints: (builder) => {
    return {
     getAllStore: builder.query({
        query: () => ({
            url: `/vendor/store`,
            method: "GET",
            headers: { ...headers },
        }),
      }),
          
      getSingleStore: builder.query({
        query: (dataId) => ({
          url: `/vendor/store`,
          method: "GET",
          headers: { ...headers },
        }),
      }),

      createStore: builder.mutation({
        query: (data) => ({
          url: `/vendor/store`,
          method: "POST",
          headers: { ...headers },
          body: data,
        }),
        invalidatesTags: [type],
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
        invalidatesTags: [type],
      }),

      deleteStore: builder.mutation({
        query: (storeId) => ({
          url: `/vendor/store?storeId=${storeId}`,
          method: "DELETE",
          headers: { ...headers },
        }),
        invalidatesTags: [type],
      }),

    };
  },
});

export const {
  useGetAllStoreQuery,
  useGetSingleStoreQuery,
  useCreateStoreMutation,
  useEditStoreMutation,
  useDeleteStoreMutation,
} = storeSlice;
