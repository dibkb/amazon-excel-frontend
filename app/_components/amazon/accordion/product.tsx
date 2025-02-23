"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { geistMono } from "@/app/fonts";
import { AmazonProductResponse } from "@/src/api";
import Stars from "../stars/stars";
import ProductImages from "../carosoul/product-images";
import Offers from "../offers";
import Service from "../service";
import Categories from "../categories";
import Price from "../price";

interface ProductAccordion {
  data: AmazonProductResponse;
}

const ProductAccordion = ({ data }: ProductAccordion) => {
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
          <Categories categories={data.product.categories ?? []} />
          <main className="flex gap-4">
            {/* left */}
            <ProductImages images={data.product.image ?? []} />
            {/* right */}
            <div className="flex flex-col gap-2">
              <p className={`text-stone-900 text-2xl font-semibold`}>
                {data.product.title}
              </p>
              <span className="flex items-center gap-2 border-b pb-4">
                <p>{data.product.ratings?.rating}</p>
                <Stars ratings={data.product.ratings ?? {}} />

                <p className="text-cyan-700 text-xs font-bold">
                  {data.product.ratings?.review_count} ratings
                </p>
              </span>

              <span className="flex flex-col gap-2 border-b pb-3">
                <Price price={data.product.price ?? 0} />
              </span>
              <span className="flex flex-col gap-2 border-b pb-3">
                <Offers price={data.product.price ?? 0} />
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
