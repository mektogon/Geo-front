import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { name: string; password: string }) => ({
          url: "auth/login",
          method: "post",
          body,
        }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
