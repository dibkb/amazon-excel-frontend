"use client";
import { geistMono } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductRow from "./product-row";
import { Product } from "@/src/api/models/Product";
import React from "react";
const ProductInformation = ({ product }: { product: Product }) => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
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
          {Object.entries(product?.specifications?.additional ?? {}).map(
            ([key, value], id) => (
              <ProductRow key={id + key} row={key} value={value} />
            )
          )}
          <p className="text-sm font-bold text-stone-900 text-center my-3">
            Technical Specifications
          </p>
          {Object.entries(product?.specifications?.technical ?? {}).map(
            ([key, value], id) => (
              <ProductRow key={id + key} row={key} value={value} />
            )
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductInformation;
