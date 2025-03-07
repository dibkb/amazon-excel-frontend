"use client";
import { geistMono, ptSerif } from "@/app/fonts";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ProductInformation from "../product-information/product-information";
import ProductHighlights from "../highlights/highlights";
import ProductAccordion from "../accordion/product";
// import ThumbnailAccordion from "../accordion/thumbnail";
import { productStore } from "@/app/store/productStore";
import { Button } from "@/components/ui/button";
import { useEnhanceProduct } from "../../hooks/useEnhanceProduct";
import Link from "next/link";
import Image from "next/image";
import Publish from "@/svg/publish";
import { publishBranch } from "@/server/publish";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getTest } from "@/db/query/test";
import ThumbnailAccordion from "../accordion/thumbnail";
import ArrowRight from "@/svg/arrow-right";

const AbTest = () => {
  const { product, asin, productEnhancements } = productStore();
  const { enhanceProduct, loading } = useEnhanceProduct(asin);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [testid, setTestid] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getTestData() {
      setIsLoading(true);
      if (userId && asin) {
        const test = await getTest(userId, asin);
        if (test) {
          setTestid(test.id);
        }
      }
      setIsLoading(false);
    }
    getTestData();
  }, [userId, asin]);

  async function publishBranchHandler() {
    if (!userId || !asin) {
      router.push("/auth/signin");
      return;
    }
    if (!product || !productEnhancements) {
      return;
    }
    const result = await publishBranch(userId, asin);
    if (result.success) {
      setTestid(result.id);
    }
  }
  const contnetNull = (
    <div className="flex flex-col gap-2">
      <p className="text-start text-stone-500 text-sm font-medium">
        Instantly generate a tailored product description, catchy title, and
        eye-catching thumbnail using our advanced AI tool. Elevate your Amazon
        listing in just one click.
      </p>
      <Button
        className="w-fit font-semibold mt-4 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        onClick={enhanceProduct}
      >
        Generate Content
      </Button>
      {loading && (
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            alt="Loading..."
            width={20}
            height={20}
            priority
          />
          <p className="text-start text-stone-400 text-sm font-medium">
            Please wait while we generate the content...
          </p>
        </div>
      )}
    </div>
  );
  if (isLoading) {
    return (
      <div className="flex gap-2 items-center justify-start h-full">
        <Image
          src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt="Loading..."
          width={20}
          height={20}
        />
        <p className="text-stone-500 text-sm font-medium">Loading...</p>
      </div>
    );
  }
  if (testid) {
    return (
      <div className="flex flex-col gap-2 my-4">
        <p className="text-stone-500 font-medium">
          You already created a test for this product
        </p>
        <Link
          href={`/dashboard/${testid}`}
          target="_blank"
          className={cn(
            "text-start text-stone-500 text-sm font-medium border rounded-md p-2 w-fit hover:border-stone-800 hover:bg-stone-100 transition-all duration-300",
            geistMono.className
          )}
        >
          <p>Test ID : {testid}</p>
          <p>ASIN : {asin}</p>
        </Link>
        <div className="flex flex-col gap-2">
          <p className="text-stone-500 text-sm font-medium">
            Public test link :
          </p>
          <Link
            href={`/ab-test/${testid}`}
            target="_blank"
            className={cn(
              "text-start text-stone-500 text-sm font-medium flex items-center gap-2 hover:text-stone-800 transition-all duration-300 hover:underline",
              geistMono.className
            )}
          >
            <ArrowRight className="size-4 font-medium" />
            {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/ab-test/${testid}`}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-220px)] overflow-hidden">
      <div className="w-full h-[100px] py-2">
        <p className="text-start text-stone-500 text-sm font-medium">
          Empower your users to choose between your original and AI-generated
          copy. Monitor real-time feedback on your dashboard to see which
          version wins.
        </p>
        <Button
          className={cn("mt-4", geistMono.className)}
          onClick={publishBranchHandler}
        >
          Publish A/B Test Now
          <Publish className="size-4" />
        </Button>
      </div>
      <div className="mt-10 h-[calc(100%-3rem)] grid grid-cols-2 gap-4">
        <div className="border rounded-md flex flex-col overflow-hidden">
          <p
            className={cn(
              ptSerif.className,
              "text-lg text-center py-3 bg-white z-10"
            )}
          >
            Original Copy
          </p>
          <div className="overflow-y-auto p-4 flex-1">
            {/* Original content goes here */}
            {product && (
              <>
                <ThumbnailAccordion product={product} />
                <ProductAccordion product={product} swot={true} />
                <ProductHighlights product={product} />
                <ProductInformation product={product} />
              </>
            )}
          </div>
        </div>
        <div className="border rounded-md flex flex-col overflow-hidden">
          <p
            className={cn(
              ptSerif.className,
              "text-lg text-center py-3 bg-white z-10"
            )}
          >
            AI Enhanced Copy ✨
          </p>
          <div className="overflow-y-auto p-4 flex-1">
            {/* AI generated content goes here */}
            {productEnhancements ? (
              <>
                <ThumbnailAccordion product={productEnhancements} />
                <ProductAccordion product={productEnhancements} swot={true} />
                <ProductHighlights product={productEnhancements} />
                <ProductInformation product={productEnhancements} />
              </>
            ) : (
              contnetNull
            )}{" "}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-[100vw]">
        {productEnhancements?.source && (
          <div className={cn("px-3 flex gap-2", geistMono.className)}>
            <p className="text-xs text-stone-500">Sources :</p>
            <Link
              href={productEnhancements.source}
              target="_blank"
              className={cn(
                "text-xs bg-blue-100 rounded-md hover:bg-blue-200 transition-all duration-300 z-10 text-blue-700 line-clamp-1 max-w-[400px] w-fit px-4 font-semibold"
              )}
            >
              {productEnhancements.source}
            </Link>
            <Link
              href={`https://www.amazon.in/dp/${asin}`}
              target="_blank"
              className={cn(
                "text-xs bg-blue-100 rounded-md hover:bg-blue-200 transition-all duration-300 z-10 text-blue-700 line-clamp-1 max-w-[400px] w-fit px-4 font-semibold"
              )}
            >
              {`https://www.amazon.in/dp/${asin}`}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbTest;
