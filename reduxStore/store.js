import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/reduxStore/features/appSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
    },
  });
};
