import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import type { RootState } from "../store";

import { Geo } from "./geo.types";

export const geoApi = createApi({
  reducerPath: "geoApi",
  tagTypes: ["geo", "types", "designation"],
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
    getGeographies: build.query<Geo, void>({
      query: () => ({
        url: "/geo",
        method: "GET",
      }),
      providesTags: [{ type: "geo", id: "LIST" }],
    }),
    getGeography: build.query<Geo, number>({
      query: (id) => `geo/getById/${id}`,
      providesTags: (_geo, _err, id) => [{ type: "geo", id }],
    }),
    createGeo: build.mutation<Geo, Geo>({
      query: (body) => ({
        url: `geo`,
        method: "POST",
        body,
        headers: {
          // "Content-type":
          //   "application/json; charset=UTF-8; multipart/form-data",
          "Content-Type": "multipart/form-data; boundary=something",
        },
      }),
      invalidatesTags: ["geo"],
    }),
    getTypes: build.query<void, void>({
      query: () => ({
        url: "/type-object",
        method: "GET",
      }),
      providesTags: [{ type: "types", id: "LIST" }],
    }),
    getDesignations: build.query<void, void>({
      query: () => ({
        url: "/designation",
        method: "GET",
      }),
      providesTags: [{ type: "designation", id: "LIST" }],
    }),
  }),
});
export const {
  useGetGeographiesQuery,
  useGetGeographyQuery,
  useCreateGeoMutation,
  useGetTypesQuery,
  useGetDesignationsQuery,
} = geoApi;
