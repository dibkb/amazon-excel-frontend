import { geistMono } from "@/app/fonts";
import { productStore } from "@/app/store/productStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
const WebsiteReviews = () => {
  const { websiteReview, loadingWebsiteReview } = productStore();
  const loadingContent = (
    <div className="flex gap-2">
      <Image
        src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
        alt="Loading..."
        width={20}
        height={20}
        priority
      />
      <p className="text-sm text-stone-500">
        Analyzing reviews across the web ...
      </p>
    </div>
  );
  const content = (
    <div className="flex flex-col gap-4">
      {websiteReview?.map((reviews) => {
        return (
          <main
            key={reviews.source}
            className="flex flex-col gap-4 border-b py-4"
          >
            <div>
              <p className="font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md w-fit">
                ✅ Positive Points
              </p>
              <ul className="list-disc list-inside text-sm flex flex-col gap-2 mt-4 font-medium">
                {reviews.review.positive_points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-md w-fit">
                ❌ Negative Points
              </p>
              <ul className="list-disc list-inside text-sm flex flex-col gap-2 mt-4 font-medium">
                {reviews.review.negative_points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-md w-fit">
                💡 Suggested Improvements
              </p>
              <ul className="list-disc list-inside text-sm flex flex-col gap-2 mt-4 font-medium">
                {reviews.review.suggested_improvements.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 text-blue-700 font-bold w-fit px-4 py-1 rounded-md bg-blue-100 justify-center items-center">
              <p className={cn("text-sm", geistMono.className)}>
                Score: {reviews.review.overall_rating}/10
              </p>
            </div>
            <Link
              href={reviews.source}
              className={cn(
                "text-stone-800 font-semibold text-xs bg-stone-100 rounded-md px-2 py-1 flex items-center gap-2 w-fit hover:bg-stone-200 transition-all duration-300",
                geistMono.className
              )}
            >
              <Image
                src={reviews.favicon}
                alt={reviews.source}
                width={10}
                height={10}
              />
              {reviews.source}
            </Link>
          </main>
        );
      })}
    </div>
  );
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="comments"
    >
      <AccordionItem value="comments">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Reviews Across the Web
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 m-6">
          {loadingWebsiteReview ? loadingContent : content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WebsiteReviews;
