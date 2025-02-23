"use client";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { AmazonProductResponse } from "@/src/api";
import React from "react";
import { geistMono } from "@/app/fonts";
import Stars from "../stars/stars";

const Reviews = ({ data }: { data: AmazonProductResponse }) => {
  console.log(data);
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Customer Reviews
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <div className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-2">
              <Stars ratings={data.product.ratings ?? {}} />
              <p className="text-sm font-bold text-stone-900">
                {data.product.ratings?.rating}
              </p>
            </span>
            <p className="text-xs font-medium text-stone-600">
              {data.product.ratings?.review_count} global ratings
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Reviews;
