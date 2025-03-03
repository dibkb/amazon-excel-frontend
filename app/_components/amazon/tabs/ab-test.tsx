"use client";
import { ptSerif } from "@/app/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import ProductInformation from "../product-information/product-information";
import ProductHighlights from "../highlights/highlights";
import ProductAccordion from "../accordion/product";
import ThumbnailAccordion from "../accordion/thumbnail";
import { productStore } from "@/app/store/productStore";
import { Button } from "@/components/ui/button";
import { useEnhanceProduct } from "../../hooks/useEnhanceProduct";

const AbTest = () => {
  const { product, asin, productEnhancements } = productStore();
  const { enhanceProduct, loading } = useEnhanceProduct(asin);
  const contnetNull = (
    <div className="flex flex-col gap-2">
      <p className="text-start text-stone-500 text-sm font-medium">
        Instantly generate a tailored product description, catchy title, and
        eye-catching thumbnail using our advanced AI tool. Elevate your Amazon
        listing in just one click.
      </p>
      <Button
        className="w-fit text-sm font-semibold mt-4 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        onClick={enhanceProduct}
      >
        Generate Content
      </Button>
      {loading && (
        <p className="text-start text-stone-500 text-sm font-medium">
          Please wait while we generate the content
        </p>
      )}
    </div>
  );
  return (
    <div className="h-[calc(100vh-220px)] overflow-hidden">
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
            AI Generated Copy
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbTest;
