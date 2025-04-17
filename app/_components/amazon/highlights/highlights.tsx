"use client";
import { geistMono } from "@/app/fonts";
import ChevronRightSvg from "./chevron-right-svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/src/api/models/Product";
import { useEffect } from "react";
import { useState } from "react";

const ProductHighlights = ({ product }: { product: Product }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  const content = product?.description?.highlights?.map((highlight, id) => (
    <li key={id + highlight} className="flex items-start gap-2">
      <ChevronRightSvg />
      <span>{highlight}</span>
    </li>
  ));

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Product Description
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <ul className="flex flex-col gap-3 text-sm font-medium text-stone-900">
            {content}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductHighlights;
