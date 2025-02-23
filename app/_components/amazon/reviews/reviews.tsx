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
import { Progress } from "@/components/ui/progress";
import Ratingbar from "./rating-bar";

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
          <main className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-2">
              <Stars ratings={data.product.ratings ?? {}} />
              <p className="text-sm font-bold text-stone-900">
                {data.product.ratings?.rating}
              </p>
            </span>
            <p className="text-xs font-medium text-stone-600">
              {data.product.ratings?.review_count} global ratings
            </p>
            <main className="flex flex-col gap-1">
              <Ratingbar
                text="5 star"
                percentage={
                  data.product.ratings?.rating_stats?.five_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="4 star"
                percentage={
                  data.product.ratings?.rating_stats?.four_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="3 star"
                percentage={
                  data.product.ratings?.rating_stats?.three_star?.percentage ??
                  0
                }
              />
              <Ratingbar
                text="2 star"
                percentage={
                  data.product.ratings?.rating_stats?.two_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="1 star"
                percentage={
                  data.product.ratings?.rating_stats?.one_star?.percentage ?? 0
                }
              />
            </main>
          </main>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Reviews;
