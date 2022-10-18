import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import { geoApi } from "./geo/geo";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [geoApi.reducerPath]: geoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(geoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
