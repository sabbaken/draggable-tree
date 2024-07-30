import {configureStore} from "@reduxjs/toolkit";

export const store: any = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;