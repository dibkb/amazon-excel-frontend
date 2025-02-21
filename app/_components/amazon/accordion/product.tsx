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
import { formatIndian } from "@/utils/amazon/format-number";
import ProductImages from "../carosoul/product-images";
import Offers from "../offers";
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

              <span className="flex flex-col gap-2 border-b pb-4">
                <p className="text-stone-900 text-2xl font-semibold">
                  ₹{formatIndian(data.product.price ?? 0)}
                </p>
                <p className="text-stone-500 text-sm font-semibold">
                  Inclusive of all taxes
                </p>
                <span className="">
                  With{" "}
                  <span className="text-stone-800 font-bold">
                    Amazon Business
                  </span>
                  , you would have{" "}
                  <span className="text-stone-800 font-bold">
                    saved ₹1,631.51
                  </span>{" "}
                  in the last year.{" "}
                  <span className="text-cyan-800 font-bold">
                    Create a free account
                  </span>{" "}
                  and{" "}
                  <span className="text-stone-800 font-bold">
                    save up to 15%
                  </span>{" "}
                  today.
                </span>
              </span>
              <span className="flex flex-col gap-2 border-b pb-4">
                <Offers price={data.product.price ?? 0} />
              </span>
            </div>
          </main>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductAccordion;
