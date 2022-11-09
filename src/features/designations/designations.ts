import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import type { RootState } from "../store";
import { TDesignations } from "./designations.types";

export const designationsApi = createApi({
  reducerPath: "designationsApi",
  tagTypes: ["designations", "photos"],
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
    getDesignations: build.query<TDesignations, any>({
      query: () => ({
        url: "/designation",
        method: "GET",
      }),
      providesTags: ["designations"],
    }),

    getDesignation: build.query<any, number>({
      query: (id) => `/designation/${id}`,
      providesTags: (_geo, _err, id) => [{ type: "designations", id }],
    }),

    getPhotos: build.query<any, any>({
      query: () => ({
        url: "/photo",
        method: "GET",
      }),
      providesTags: ["photos"],
    }),
  }),
});
export const {
  useGetDesignationsQuery,
  useGetDesignationQuery,
  useGetPhotosQuery,
} = designationsApi;
