"use client";
import { geistMono } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AmazonProductResponse } from "@/src/api";
import ProductRow from "./product-row";

interface ProductHighlights {
  data: AmazonProductResponse;
}

const ProductInformation = ({ data }: ProductHighlights) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Product Information
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <p className="text-sm font-bold text-stone-900 text-center my-3">
            Specifications
          </p>
          {Object.entries(data.product.specifications?.additional ?? {}).map(
            ([key, value]) => (
              <ProductRow key={key} row={key} value={value} />
            )
          )}
          <p className="text-sm font-bold text-stone-900 text-center my-3">
            Technical Specifications
          </p>
          {Object.entries(data.product.specifications?.technical ?? {}).map(
            ([key, value]) => (
              <ProductRow key={key} row={key} value={value} />
            )
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductInformation;
