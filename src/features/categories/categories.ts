import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import type { RootState } from "../store";

import { Categories, Ctg } from "./categories.types";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["categories"],
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
    getCategories: build.query<Categories, any>({
      query: () => ({
        url: "/type-object",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "categories" as const, id })),
              { type: "categories", id: "LIST" },
            ]
          : [{ type: "categories", id: "LIST" }],
    }),

    addCategory: build.mutation<Ctg, Partial<Ctg>>({
      query: (body) => ({
        url: `type-object`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "categories", id: "LIST" }],
    }),

    deleteCategory: build.mutation<{ id: number }, number>({
      query(id) {
        return {
          url: `type-object/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "categories", id }],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
} = categoriesApi;
