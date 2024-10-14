import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./middleware";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addTopics: builder.mutation({
      query: (data) => ({
        url: `users/topics`,
        method: "POST",
        body: data,
      }),
    }),

    getQuestions: builder.query({
      query: () => ({
        url: `question`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddTopicsMutation, useGetQuestionsQuery } = questionApi;
