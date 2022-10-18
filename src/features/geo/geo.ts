import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import type { RootState } from "../store";

import { Geo } from "./geo.types";

export const geoApi = createApi({
  reducerPath: "geoApi",
  tagTypes: ["geo"],
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const { token }: any = (getState() as RootState).auth.username;

      if (token) {
        headers.set("authorization", `Bearer_${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getGeographies: build.query<Geo, number>({
      query: () => ({
        url: "/geo",
        method: "GET",
      }),
      providesTags: [{ type: "geo", id: "LIST" }],
    }),
  }),
});

export const { useGetGeographiesQuery } = geoApi;