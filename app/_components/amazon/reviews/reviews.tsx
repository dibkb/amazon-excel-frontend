"use client";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion";
import React from "react";
import { geistMono } from "@/app/fonts";
import Stars from "../stars/stars";
import Ratingbar from "./rating-bar";
import ReviewsList from "./review-list";
import { Product } from "@/src/api/models/Product";

const Reviews = ({ product }: { product: Product }) => {
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
          Customer Reviews
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <section className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-2">
              <Stars rating={Number(product?.ratings?.rating)} />
              <p className="text-sm font-bold text-stone-900">
                {product?.ratings?.rating}
              </p>
            </span>
            <p className="text-xs font-medium text-stone-600">
              {product?.ratings?.review_count} global ratings
            </p>
            <main className="flex flex-col gap-1">
              <Ratingbar
                text="5 star"
                percentage={
                  product?.ratings?.rating_stats?.five_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="4 star"
                percentage={
                  product?.ratings?.rating_stats?.four_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="3 star"
                percentage={
                  product?.ratings?.rating_stats?.three_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="2 star"
                percentage={
                  product?.ratings?.rating_stats?.two_star?.percentage ?? 0
                }
              />
              <Ratingbar
                text="1 star"
                percentage={
                  product?.ratings?.rating_stats?.one_star?.percentage ?? 0
                }
              />
            </main>
            {/* reviews */}
            <ReviewsList reviews={product?.reviews ?? []} />
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Reviews;
