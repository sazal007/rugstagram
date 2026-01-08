"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import NextjsToploader from "nextjs-toploader";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <NextjsToploader color="#c2c2c2" />
      <AuthProvider>
        <CartProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
