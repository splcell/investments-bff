import { configureStore } from "@reduxjs/toolkit";
import { investmentsApi } from "./investmentsApi";


export const store = configureStore({
  reducer: {
    [investmentsApi.reducerPath]: investmentsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(investmentsApi.middleware),
});
