"use client";
import { AmazonProductResponse } from "@/src/api";
import api from "@/src/axios/base";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/app/_components/amazon/tabs/product";
import Sowt from "@/app/_components/amazon/tabs/swot";
import Improvements from "@/app/_components/amazon/tabs/improvements";
import { useEffect, useState, use } from "react";

export default function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const { asin } = use(params);
  const [data, setData] = useState<AmazonProductResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = (await api.get(`/amazon/${asin}`)) as {
        data: AmazonProductResponse;
      };
      setData(data);
    };
    fetchData();
  }, [asin]);

  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="grid w-[700px] grid-cols-4 mx-auto sticky z-10 top-12">
        <TabsTrigger value="product">Product Details</TabsTrigger>
        <TabsTrigger value="improvements">
          <span className="flex items-center gap-2">🤖 Improvements</span>
        </TabsTrigger>
        <TabsTrigger value="swot">
          <span className="flex items-center gap-2">🚀 SWOT</span>
        </TabsTrigger>
        <TabsTrigger value="ab-test">
          <span className="flex items-center gap-2">🧪 AB Test</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="product">
        {data && <Product data={data} asin={asin} />}
      </TabsContent>
      <TabsContent value="improvements">
        <Improvements />
      </TabsContent>
      <TabsContent value="swot">{data && <Sowt data={data} />}</TabsContent>
      <TabsContent value="ab-test">
        <div>ab-test</div>
      </TabsContent>
    </Tabs>
  );
}
