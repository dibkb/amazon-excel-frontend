"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/app/_components/amazon/tabs/product";
import Sowt from "@/app/_components/amazon/tabs/swot";
import Improvements from "@/app/_components/amazon/tabs/improvements";
import { use } from "react";
import { useFetchProductData } from "@/app/_components/hooks/useFetchProductData";
import { useFetchImprovements } from "@/app/_components/hooks/useFetchImprvements";
import { useMakeSocket } from "@/app/_components/hooks/useMakeSocket";
export default function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const { asin } = use(params);
  useFetchProductData(asin);
  useFetchImprovements(asin);
  // make socket
  useMakeSocket();
  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="grid w-[900px] grid-cols-5 mx-auto sticky z-10 top-12">
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
      <TabsContent value="product">
        <Product />
      </TabsContent>
      <TabsContent value="improvements">
        <Improvements />
      </TabsContent>
      <TabsContent value="swot">
        <Sowt />
      </TabsContent>
      <TabsContent value="ab-test">
        <div>ab-test</div>
      </TabsContent>
      <TabsContent value="dashboard">
        <div>dashboard</div>
      </TabsContent>
    </Tabs>
  );
}
