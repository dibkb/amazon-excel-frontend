"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/app/_components/amazon/tabs/product";
import Sowt from "@/app/_components/amazon/tabs/swot";
import Improvements from "@/app/_components/amazon/tabs/improvements";
import { use, useEffect } from "react";
import { useFetchProductData } from "@/app/_components/hooks/useFetchProductData";
import { useFetchImprovements } from "@/app/_components/hooks/useFetchImprvements";
import { useMakeSocket } from "@/app/_components/hooks/useMakeSocket";
import { getUserByUsername } from "@/db/query/users";

// Create a wrapper component that uses session
function AsinContent({ asin }: { asin: string }) {
  // Hooks that need session
  useFetchProductData(asin);
  useFetchImprovements(asin);
  useMakeSocket();

  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    async function fetchUser() {
      const user = await getUserByUsername("test");
      console.log("user", user);
    }
    fetchUser();
  }, []);

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
