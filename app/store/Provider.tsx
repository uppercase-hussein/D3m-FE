"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const persistor = persistStore(store);

// Create a client
export const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}
