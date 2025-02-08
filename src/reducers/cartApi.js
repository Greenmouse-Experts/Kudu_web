import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("kuduUserToken");
console.log("token: ", token)
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

export const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  keepUnusedDataFor: 0,
  tagTypes: ["Cart"],

  endpoints: (builder) => {
    return {

      addToCart: builder.mutation({
        query: (data) => ({
          url: `/user/cart/add`,
          method: "POST",
          headers: { ...headers },
          body: data,
        }),
        invalidatesTags: ["Cart"],
      }),

    };
  },
});

export const {
  useAddToCartMutation

} = cartApi;
