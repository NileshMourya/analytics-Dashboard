import { configureStore } from "@reduxjs/toolkit";
import excelSlice from "@/app/store/excelSlice";

export const store = configureStore({
  reducer: {
    excel: excelSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disables the warning
    }),
});
