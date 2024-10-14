import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./middleware";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
   
  }),
});

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
} = authApi;
