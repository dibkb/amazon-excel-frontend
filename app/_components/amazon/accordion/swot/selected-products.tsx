"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatIndian } from "@/utils/amazon/format-number";
import React from "react";
import Image from "next/image";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import { cn } from "@/lib/utils";
import { geistMono, manrope } from "@/app/fonts";
import { AmazonProductResponse } from "@/src/api/models/AmazonProductResponse";
import { productStore } from "@/app/store/productStore";

const emojiMap = {
  checked: "✅",
  cross: "❌",
};
interface SelectedProductsProps {
  relatedProducts: AmazonProductResponse["product"]["related_products"];
}
const SelectedProducts = ({ relatedProducts }: SelectedProductsProps) => {
  const { selectedProducts, setSelectedProducts } = productStore();
  const onClickHandler = (asin: string) => {
    if (selectedProducts.includes(asin)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== asin));
      return;
    }

    if (selectedProducts.length >= 3) {
      // TODO : toast
      return;
    }

    setSelectedProducts([...selectedProducts, asin]);
  };
  const products = relatedProducts?.map((prod, id) => {
    return (
      <div
        className={cn(
          "flex gap-4 border p-4 rounded-md cursor-pointer hover:border-teal-700 transition-all duration-300",
          selectedProducts.includes(prod.asin)
            ? " bg-teal-600"
            : "border-stone-200"
        )}
        key={prod.asin + id}
        onClick={() => onClickHandler(prod.asin)}
      >
        <Image
          src={constructImageUrl(prod.img_id ?? "")}
          alt="Thumbnail"
          width={150}
          height={150}
          className="rounded-md"
        />
        <div
          className={cn(
            `${manrope.className} text-stone-700 flex flex-col gap-2`,
            selectedProducts.includes(prod.asin)
              ? "text-white"
              : "text-stone-700"
          )}
        >
          <p className={cn(`text-stone-700 text-sm`, geistMono.className)}>
            {prod.asin}
          </p>
          <p className={`font-bold text-base`}>{prod.title}</p>
          <p className={`text-amazon-red font-semibold text-sm`}>
            ₹{formatIndian(prod.price ?? 0)}
          </p>
        </div>
      </div>
    );
  });
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="imporovements"
    >
      <AccordionItem value="imporovements">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          {emojiMap[selectedProducts.length ? "checked" : "cross"]} Select Upto
          3 products for comparison ({selectedProducts.length} selected)
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 m-6">
          {products}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectedProducts;
