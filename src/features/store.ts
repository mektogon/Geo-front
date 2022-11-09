import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

import authReducer from "./auth/authSlice";
import { categoriesApi } from "./categories/categories";
import { designationsApi } from "./designations/designations";
import { geoApi } from "./geo/geo";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [geoApi.reducerPath]: geoApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [designationsApi.reducerPath]: designationsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      geoApi.middleware,
      categoriesApi.middleware,
      designationsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
