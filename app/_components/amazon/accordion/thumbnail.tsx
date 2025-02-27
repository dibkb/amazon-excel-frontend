"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { geistMono, manrope } from "@/app/fonts";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import Stars from "../stars/stars";
import { formatIndian } from "@/utils/amazon/format-number";
import { productStore } from "@/app/store/productStore";

const ThumbnailAccordion = () => {
  const { product } = productStore();
  const [deliveryDate, setDeliveryDate] = React.useState<string>("");
  const [stock, setStock] = React.useState<number>(0);

  React.useEffect(() => {
    // Calculate delivery date
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const formatted = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date);
    setDeliveryDate(formatted);

    // Generate random stock
    setStock(Math.floor(Math.random() * 5) + 1);
  }, []);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Thumbnail
        </AccordionTrigger>
        <AccordionContent className="flex gap-3">
          <Image
            src={constructImageUrl(product?.image?.[0] ?? "")}
            alt="Thumbnail"
            width={200}
            height={200}
          />
          <div
            className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
          >
            <p className={`text-stone-800 font-bold text-lg`}>
              {product?.title}
            </p>
            <span className="flex items-center gap-1">
              <Stars rating={Number(product?.ratings?.rating)} />
              <span className="text-sm text-cyan-800 font-semibold">
                {product?.ratings?.review_count}
              </span>
            </span>
            <p className={`text-amazon-red font-semibold text-xl`}>
              ₹{formatIndian(product?.price ?? 0)}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-stone-500 font-medium">
                FREE Delivery by Amazon
              </p>
              <p className="text-sm text-stone-500 font-medium">
                Get it by <span className="font-bold">{deliveryDate}</span>
              </p>
              <p className="text-sm text-amazon-red font-medium">
                Only {stock} left in stock.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ThumbnailAccordion;
