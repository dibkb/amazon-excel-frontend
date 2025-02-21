import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { geistMono, manrope } from "@/app/fonts";
import { AmazonProductResponse } from "@/src/api";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";

interface ThumbnailAccordionProps {
  data: AmazonProductResponse;
}

const ThumbnailAccordion = ({ data }: ThumbnailAccordionProps) => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(deliveryDate);

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
            src={constructImageUrl(data.product.image?.[0] ?? "")}
            alt="Thumbnail"
            width={200}
            height={200}
          />
          <div
            className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
          >
            <p className={`text-stone-800 font-bold text-lg`}>
              {data.product.title}
            </p>
            <p className={`text-amazon-red font-semibold text-xl`}>
              ₹{data.product.price}
            </p>
            <p className="text-sm text-stone-500 font-medium">
              FREE Delivery by Amazon
            </p>
            <p className="text-sm text-stone-500 font-medium">
              Get it by {formattedDate}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ThumbnailAccordion;
