"use client";
import { SessionProvider } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/app/_components/amazon/tabs/product";
import Sowt from "@/app/_components/amazon/tabs/swot";
import Improvements from "@/app/_components/amazon/tabs/improvements";
import { use, useEffect, useState } from "react";
import { useFetchProductData } from "@/app/_components/hooks/useFetchProductData";
// import { useMakeSocket } from "@/app/_components/hooks/useMakeSocket";
import AbTest from "@/app/_components/amazon/tabs/ab-test";
import { productStore } from "@/app/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Dashboard from "@/app/_components/amazon/tabs/dashboard";
import { AlertDialog } from "@/app/_components/layout/alert";
import { useRouter } from "next/navigation";
// Create a wrapper component that uses session
function AsinContent({ asin }: { asin: string }) {
  const router = useRouter();
  useFetchProductData(asin);

  // Hooks that need session

  // useMakeSocket();

  const { loadingProduct, product, errorProduct, setErrorProduct } =
    productStore();

  // const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  const handleClose = () => {
    setErrorProduct(null);
    router.push("/");
  };
  if (errorProduct) {
    return (
      <AlertDialog message={errorProduct} asin={asin} onClose={handleClose} />
    );
  }
  if (product && !loadingProduct) {
    return (
      <Tabs defaultValue="product" className="w-full mt-[60px]">
        <TabsList className="grid w-[900px] grid-cols-5 mx-auto sticky z-10">
          <TabsTrigger value="product">📄 Product Details</TabsTrigger>
          <TabsTrigger value="improvements">
            <span className="flex items-center gap-2">🤖 Improvements</span>
          </TabsTrigger>
          <TabsTrigger value="swot">
            <span className="flex items-center gap-2">🚀 SWOT</span>
          </TabsTrigger>
          <TabsTrigger value="ab-test">
            <span className="flex items-center gap-2">🧪 AB Test</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard">
            <span className="flex items-center gap-2">🌐 Dashboard</span>
          </TabsTrigger>
        </TabsList>
        {/* Content */}
        <TabsContent value="product">
          <Product />
        </TabsContent>
        <TabsContent value="improvements">
          <Improvements asin={asin} />
        </TabsContent>
        <TabsContent value="swot">
          <Sowt />
        </TabsContent>
        <TabsContent value="ab-test">
          <AbTest />
        </TabsContent>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
      </Tabs>
    );
  } else {
    return (
      <div className="flex flex-col gap-8 mt-[60px]">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[500px]" />
      </div>
    );
  }
}

// Main component that provides the session
export default function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const { asin } = use(params);

  return (
    <SessionProvider>
      <AsinContent asin={asin} />
    </SessionProvider>
  );
}
