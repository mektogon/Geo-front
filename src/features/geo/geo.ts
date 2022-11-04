import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import type { RootState } from "../store";

import { Geo, Search } from "./geo.types";

export const geoApi = createApi({
  reducerPath: "geoApi",
  tagTypes: ["geo", "types", "designation", "locality"],
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
    getGeographies: build.query<any, Geo>({
      query: () => ({
        url: "/geo",
        method: "GET",
      }),
      providesTags: ["geo"],
    }),

    searchGeography: build.query<Search[], string>({
      query: (name) => ({
        url: `/geo/${name}`,
        method: "GET",
        params: {
          name,
        },
      }),
      providesTags: [{ type: "geo", id: "LIST" }],
    }),

    getGeography: build.query<Geo, number>({
      query: (id) => `geo/getById/${id}`,
      providesTags: (_geo, _err, id) => [{ type: "geo", id }],
    }),

    deleteGeo: build.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/geo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (geo) => [{ type: "geo", id: geo?.id }],
    }),

    createGeo: build.mutation<Geo, Geo>({
      query: (body) => ({
        url: `geo`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["geo"],
    }),

    getTypes: build.query<[], []>({
      query: () => ({
        url: "/type-object",
        method: "GET",
      }),
      providesTags: [{ type: "types", id: "LIST" }],
    }),

    getDesignations: build.query<[], []>({
      query: () => ({
        url: "/designation",
        method: "GET",
      }),
      providesTags: [{ type: "designation", id: "LIST" }],
    }),

    getTypeLocalities: build.query<[], []>({
      query: () => ({
        url: "/type-locality",
        method: "GET",
      }),
      providesTags: [{ type: "locality", id: "LIST" }],
    }),
  }),
});
export const {
  useGetGeographiesQuery,
  useSearchGeographyQuery,
  useGetGeographyQuery,
  useCreateGeoMutation,
  useGetTypesQuery,
  useGetDesignationsQuery,
  useGetTypeLocalitiesQuery,
  useDeleteGeoMutation,
  usePrefetch,
} = geoApi;
