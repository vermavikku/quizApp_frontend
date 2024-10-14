import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./middleware";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addResult: builder.mutation({
      query: (data) => ({
        url: `users/answer`,
        method: "POST",
        body: data,
        invalidatesTags: ["result"]
      }),
    }),
    getResult: builder.query({
      query: () => ({
        url: `users/result`,
        method: "GET",
        invalidatesTags: ["result"]
      }),
    }), 
     getAllResult: builder.query({
      query: () => ({
        url: `users/all/result`,
        method: "GET",
        invalidatesTags: ["result"]
      }),
    }),
    deleteResult: builder.mutation({
      query: () => ({
        url: `/users/result`,
        method: "DELETE",
        invalidatesTags: ["result"]
      }),
    }),
  }),
});

export const {
  useAddResultMutation,
  useGetResultQuery,
  useGetAllResultQuery,
  useDeleteResultMutation,
} = resultApi;
