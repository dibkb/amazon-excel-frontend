"use client";

import { useFetchDataByTestId } from "@/app/_components/hooks/useFetchDataByTestId";
import { useFetchLocation } from "@/app/_components/hooks/useFetchLocation";
import { geistMono } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { use, useEffect, useState } from "react";

export default function AbTestPage({
  params,
}: {
  params: Promise<{ testid: string }>;
}) {
  const { testid } = use(params);
  const { productData, enhancedProductData, isLoading, error } =
    useFetchDataByTestId(testid);
  const { city, country, latitude, longitude } = useFetchLocation();
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle initial loading state
  if (!mounted) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-[calc(100vh-220px)] overflow-hidden">
      <p className="mt-4 font-medium text-center">
        Choose the one thumbnail that you would click on Amazon
      </p>

      <div className="mt-10 h-[calc(100%-3rem)] grid grid-cols-2 gap-4">
        <div className="flex flex-col overflow-hidden">
          <p className={cn("text-2xl text-center", geistMono.className)}>A</p>
        </div>
        <div className="rounded-md flex flex-col overflow-hidden">
          <p className={cn("text-2xl text-center", geistMono.className)}>B</p>
        </div>
      </div>
    </div>
  );
}
