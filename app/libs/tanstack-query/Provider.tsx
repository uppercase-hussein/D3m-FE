"use client";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// Create a client
export const queryClient = new QueryClient();

export default function CustomProvider({ children }: { children: React.ReactNode }) {
  return (
      <Provider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
          {children}
      </Provider>
  );
}
