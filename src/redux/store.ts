import counterReducer from "@/features/countSlice";
import { camerasApi } from "@/services/camerasApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { groupsApi } from "../services/groups/groupsApi";
import { interactionsApi } from "../services/interactionsApi";
import { tagsApi } from "../services/tags/tagsApi";
import { visitorsApi } from "../services/visitors/visitorsApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    [camerasApi.reducerPath]: camerasApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [visitorsApi.reducerPath]: visitorsApi.reducer,
    [interactionsApi.reducerPath]: interactionsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      camerasApi.middleware,
      groupsApi.middleware,
      visitorsApi.middleware,
      interactionsApi.middleware,
      tagsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
