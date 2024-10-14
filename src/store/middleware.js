import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "../utils/localStorage";

const baseUrl = "https://quiz-app-seven-beryl.vercel.app/v1/";

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = getFromLocalStorage("kt-auth-react-v");
    headers.set("Access-Control-Allow-Origin", "*");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
  mode: "cors",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log(result?.error?.status, "Unauthorized user ❌❌❌");

    const selectedRoleType = localStorage.getItem("selectedRoleType");

    window.location.href = "/auth/login";
    localStorage.clear();
  }

  if (result?.error?.status === 403) {
    console.log(result?.error?.status, "Access Forbidden ❌❌❌");
    window.location.href = "/";
  }

  return result;
};
