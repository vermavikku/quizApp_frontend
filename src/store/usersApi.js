import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./middleware";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addTopics: builder.mutation({
      query: (data) => ({
        url: `users/topics`,
        method: "POST",
        body: data,
      }),
    }),

    getUserTopics: builder.query({
      query: () => ({
        url: `users/topics`,
        method: "GET",
      }),
    }),
   
  }),
});

export const {
  useAddTopicsMutation,
  useGetUserTopicsQuery,
} = usersApi;
