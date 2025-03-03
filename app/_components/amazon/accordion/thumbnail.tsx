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
import { Product } from "@/src/api/models/Product";

const calculateDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Ensure consistent timezone
  });
};

const ThumbnailAccordion = ({ product }: { product: Product }) => {
  // Initialize with null to avoid hydration mismatch
  const [clientSideData, setClientSideData] = React.useState<{
    deliveryDate: string;
    stock: number;
  } | null>(null);

  // Run only once after initial render on client
  React.useEffect(() => {
    setClientSideData({
      deliveryDate: calculateDeliveryDate(),
      stock: Math.floor(Math.random() * 5) + 1,
    });
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
        <AccordionContent>
          <div className="flex gap-3">
            <Image
              src={constructImageUrl(product?.image?.[0] ?? "")}
              alt={product?.title || "Product thumbnail"}
              width={200}
              height={200}
            />
            <div
              className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
            >
              <h3 className="text-stone-800 font-bold text-lg">
                {product?.title}
              </h3>
              <div className="flex items-center gap-1">
                <Stars rating={Number(product?.ratings?.rating)} />
                <span className="text-sm text-cyan-800 font-semibold">
                  {product?.ratings?.review_count}
                </span>
              </div>
              <p className="text-amazon-red font-semibold text-xl">
                ₹{formatIndian(product?.price ?? 0)}
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-stone-500 font-medium">
                  FREE Delivery by Amazon
                </p>
                {clientSideData && (
                  <>
                    <p className="text-sm text-stone-500 font-medium">
                      Get it by{" "}
                      <span className="font-bold">
                        {clientSideData.deliveryDate}
                      </span>
                    </p>
                    <p className="text-sm text-amazon-red font-medium">
                      Only {clientSideData.stock} left in stock.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ThumbnailAccordion;
