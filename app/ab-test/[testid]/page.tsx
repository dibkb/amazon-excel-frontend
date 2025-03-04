"use client";

import { useFetchDataByTestId } from "@/app/_components/hooks/useFetchDataByTestId";
import { useFetchLocation } from "@/app/_components/hooks/useFetchLocation";

import { cn } from "@/lib/utils";
import { useEffect, useState, use, useMemo, useCallback } from "react";
import Image from "next/image";
import AbLayout from "@/app/_components/layout/ab-layout";
import Thumbnail from "@/app/_components/ab-test/thumbnail";
import ProductAccordion from "@/app/_components/amazon/accordion/product";
import ProductInformation from "@/app/_components/amazon/product-information/product-information";
import ProductHighlights from "@/app/_components/amazon/highlights/highlights";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitTestResults } from "@/server/publish";

interface Selected {
  [1]: "a" | "b";
  [2]?: "a" | "b";
}
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
  const [selected, setSelected] = useState<Selected | null>(null);
  const [mounted, setMounted] = useState(false);
  const aSideContent = useMemo(() => {
    return {
      [1]: Math.random() > 0.5 ? "ai" : "original",
      [2]: Math.random() > 0.5 ? "ai" : "original",
    };
  }, []);

  const onSelectHandler = useCallback(
    (part: "a" | "b") => {
      if (stage === 1) {
        setSelected({
          [stage]: part,
        } as Selected);
      }
      if (stage === 2) {
        setSelected((prev) => ({
          ...prev!,
          [stage]: part,
        }));
      }
      setStage((prev) => (prev + 1) as 1 | 2 | 3);
    },
    [stage]
  );

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get("name") as string;
      const review = formData.get("review") as string;
      const result = await submitTestResults({
        abTestId: testid,
        name: name,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        city: city,
        country: country,
        thumbnail:
          selected?.[1] === "a"
            ? aSideContent[1] === "ai"
              ? "ai"
              : "original"
            : aSideContent[1] === "ai"
            ? "original"
            : "ai",
        product:
          selected?.[2] === "a"
            ? aSideContent[2] === "ai"
              ? "ai"
              : "original"
            : aSideContent[2] === "ai"
            ? "original"
            : "ai",
        review: review,
      });
      if (result) {
        window.close();
      }
    },
    [latitude, longitude, city, country, testid, selected, aSideContent]
  );

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // ----------------first page------------------------
  const renderContent = (isFirstPage: boolean, isPartA: boolean) => {
    const pageAiState = aSideContent[isFirstPage ? 1 : 2];
    const useEnhanced = (pageAiState === "ai") === isPartA;
    const data = useEnhanced ? enhancedProductData : productData;

    if (!data) return null;

    if (isFirstPage) {
      return <Thumbnail product={data} />;
    }

    return (
      <>
        <ProductAccordion product={data} swot={true} />
        <ProductHighlights product={data} />
        <ProductInformation product={data} />
      </>
    );
  };

  const aContent = renderContent(true, true);
  const bContent = renderContent(true, false);
  const aContent2 = renderContent(false, true);
  const bContent2 = renderContent(false, false);

  const aPart = <main className="">{aContent}</main>;
  const bPart = <main>{bContent}</main>;
  const aPart2 = <main className="">{aContent2}</main>;
  const bPart2 = <main>{bContent2}</main>;

  // ----------------Last page------------------------

  const lastPage = (
    <main className="col-span-2">
      <p className="text-center text-2xl">
        Thank you for your valuable feedback 🥳
      </p>
      <div className="mt-4">
        <p className="text-lg font-bold">Your Selections</p>
        <p>{selected?.[1] === "a" && "Thumbnail: Option A"}</p>
        <p>{selected?.[1] === "b" && "Thumbnail: Option B"}</p>
        <p>{selected?.[2] === "a" && "Product Page: Option A"}</p>
        <p>{selected?.[2] === "b" && "Product Page: Option B"}</p>
      </div>

      <form onSubmit={submitHandler} className="flex mt-6 flex-col gap-4 p-6">
        <Input
          type="name"
          name="name"
          placeholder="Your Name (Optional)"
          className="w-1/2 font-medium h-12"
        />
        <Textarea
          name="review"
          placeholder="Share your thoughts on your selections. Your insights help us improve our product."
          className="h-24 font-medium"
        />
        <Button
          className="w-1/2 h-12 bg-blue-500 text-white hover:bg-blue-600 font-semibold"
          type="submit"
        >
          Submit Feedback
        </Button>
      </form>
    </main>
  );
  return (
    <div className="h-[calc(100vh-60px)] overflow-hidden">
      <div className="mt-4 font-medium flex items-center justify-center gap-2">
        <p className="mb-2">
          {stage === 1 && "Choose the one thumbnail that you would click on"}
          {stage === 2 && "Choose the one product page that you like"}
        </p>
        {stage < 3 && (
          <Image
            src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_640.png"
            alt="amazon"
            width={60}
            height={10}
          />
        )}
      </div>

      <div className="mt-6 h-[calc(100%-12rem)] grid grid-cols-2 gap-4">
        {stage === 1 && (
          <AbLayout a={aPart} b={bPart} onSelectHandler={onSelectHandler} />
        )}
        {stage === 2 && (
          <AbLayout a={aPart2} b={bPart2} onSelectHandler={onSelectHandler} />
        )}
        {stage === 3 && lastPage}
      </div>

      <section className="h-full">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "w-10 h-1 rounded-full bg-stone-200",
                stage >= index + 1 && "bg-stone-700"
              )}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
