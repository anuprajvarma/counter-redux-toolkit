import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: countReducer,
  },
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
