"use client";

import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

// Dynamically import components to avoid SSR issues
const App = dynamic(() => import("../App"), { ssr: false });
const RouterProvider = dynamic(() => import("../components/RouterProvider"), {
  ssr: false,
});

export default function Home() {
  // Create a client on the client-side
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <RouterProvider>
        <App />
      </RouterProvider>
    </QueryClientProvider>
  );
}
