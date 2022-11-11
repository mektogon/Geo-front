import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../../utils/api/instance";
import type { RootState } from "../store";

export const photoApi = createApi({
  reducerPath: "photoApi",
  tagTypes: ["photo"],
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
    deletePhoto: build.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/photo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (photo) => [{ type: "photo", id: photo?.id }],
    }),
  }),
});
export const { useDeletePhotoMutation } = photoApi;
