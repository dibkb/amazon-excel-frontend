import { AmazonProductResponse } from "@/src/api";
import api from "@/src/axios/base";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/app/_components/amazon/tabs/product";
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
      <TabsList className="grid w-[500px] grid-cols-2 mx-auto sticky z-10 top-6">
        <TabsTrigger value="product">Product Details</TabsTrigger>
        <TabsTrigger value="improvements">
          <span className="flex items-center gap-2">🤖 Improvements</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="product">
        <Product data={data} asin={asin} />
      </TabsContent>
      <TabsContent value="improvements">
        <div>improvements</div>
      </TabsContent>
    </Tabs>
  );
}
