import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./middleware";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addTopics: builder.mutation({
      query: (data) => ({
        url: `users/topics`,
        method: "POST",
        body: data,
      }),
    }),

    updateTopics: builder.mutation({
      query: (data) => ({
        url: `users/topics`,
        method: "PUT",
        body : data
      }),
      invalidatesTags: ["centerMaster"],
    }),
    getTopics: builder.query({
      query: () => ({
        url: `topic`,
        method: "GET",
      }),
      providesTags: ["centerMaster"],
    }),
  }),
});

export const {
  useAddTopicsMutation,
  useUpdateTopicsMutation,
  useGetTopicsQuery,
} = topicApi;
