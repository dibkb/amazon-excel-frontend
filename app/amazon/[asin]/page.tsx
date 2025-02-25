import { AmazonProductResponse } from "@/src/api";
import api from "@/src/axios/base";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/app/_components/amazon/tabs/product";
import Sowt from "@/app/_components/amazon/tabs/swot";
import Improvements from "@/app/_components/amazon/tabs/improvements";
export default async function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const asin = (await params).asin;

  const { data } = (await api.get(`/amazon/${asin}`)) as {
    data: AmazonProductResponse;
  };
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
        <Product data={data} asin={asin} />
      </TabsContent>
      <TabsContent value="improvements">
        <Improvements />
      </TabsContent>
      <TabsContent value="swot">
        <Sowt data={data} />
      </TabsContent>
      <TabsContent value="ab-test">
        <div>ab-test</div>
      </TabsContent>
    </Tabs>
  );
}
