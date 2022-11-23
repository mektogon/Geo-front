import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import { Search } from "../geo/geo.types";
import type { RootState } from "../store";

import { IDesignation, TDesignations } from "./designations.types";

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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "designations" as const,
                id,
              })),
              { type: "designations", id: "LIST" },
            ]
          : [{ type: "designations", id: "LIST" }],
    }),

    getDesignation: build.query<any, number>({
      query: (id) => `/designation/${id}`,
      providesTags: (_geo, _err, id) => [{ type: "designations", id }],
    }),

    uploadDesignaion: build.mutation<IDesignation, Partial<IDesignation>>({
      query: (body) => ({
        url: `designation`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "designations", id: "LIST" }],
    }),

    deleteDesignation: build.mutation<{ id: number }, number>({
      query(id) {
        return {
          url: `designation/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (designation) => [
        { type: "designations", id: designation?.id },
      ],
    }),

    searchDesignation: build.query<IDesignation[], string>({
      query: (name) => ({
        url: `/designation/${name}`,
        method: "GET",
        params: {
          name,
        },
      }),
      providesTags: [{ type: "designations", id: "LIST" }],
    }),

    updateDesignation: build.mutation<IDesignation, Partial<IDesignation>>({
      query: (body) => ({
        url: `/designation`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (designation) => [
        { type: "designations", id: designation?.id },
      ],
    }),
  }),
});
export const {
  useGetDesignationsQuery,
  useGetDesignationQuery,
  useUploadDesignaionMutation,
  useDeleteDesignationMutation,
  useSearchDesignationQuery,
  useUpdateDesignationMutation,
} = designationsApi;
