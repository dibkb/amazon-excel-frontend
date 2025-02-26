"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { geistMono } from "@/app/fonts";
import Stars from "../stars/stars";
import ProductImages from "../carosoul/product-images";
import Offers from "../offers";
import Service from "../service";
import Categories from "../categories";
import Price from "../price";
import { productStore } from "@/app/store/productStore";

const ProductAccordion = () => {
  const { product } = productStore();
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Product Page
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <Categories categories={product?.product.categories ?? []} />
          <main className="flex gap-4">
            {/* left */}
            <ProductImages images={product?.product.image ?? []} />
            {/* right */}
            <div className="flex flex-col gap-2">
              <p className={`text-stone-900 text-2xl font-semibold`}>
                {product?.product.title}
              </p>
              <span className="flex items-center gap-2 border-b pb-4">
                <p>{product?.product.ratings?.rating}</p>
                <Stars rating={Number(product?.product.ratings?.rating)} />

                <p className="text-cyan-700 text-xs font-bold">
                  {product?.product.ratings?.review_count} ratings
                </p>
              </span>

              <span className="flex flex-col gap-2 border-b pb-3">
                <Price price={product?.product.price ?? 0} />
              </span>
              <span className="flex flex-col gap-2 border-b pb-3">
                <Offers price={product?.product.price ?? 0} />
              </span>
              <span className="flex flex-col gap-2 border-b pb-3">
                <Service />
              </span>
            </div>
          </main>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductAccordion;
