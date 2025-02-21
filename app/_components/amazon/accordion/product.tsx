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
import { AmazonProductResponse } from "@/src/api";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";

interface ProductAccordion {
  data: AmazonProductResponse;
}

const ProductAccordion = ({ data }: ProductAccordion) => {
  const images = data.product.image;
  const [thumbnail, setThumbnail] = React.useState<string>(images?.[0] ?? "");
  console.log(images);
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Product Details
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-2">
              {images?.map((img) => (
                <span
                  key={img}
                  onClick={() => setThumbnail(img)}
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={`border rounded-md transition-all object-contain max-h-full w-auto duration-300 ${
                    thumbnail === img
                      ? "border-blue-500 border-2"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={constructImageUrl(img, 100)}
                    alt="Product thumbnail"
                    width={40}
                    height={40}
                  />
                </span>
              ))}
            </div>
            <div
              style={{
                width: "600px",
                height: "600px",
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="border border-stone-200 p-2 rounded-md transition-all object-contain max-h-full w-auto"
            >
              <Image
                src={constructImageUrl(thumbnail, 1500)}
                alt="Thumbnail"
                width={600}
                height={600}
              />
            </div>
          </div>

          <div
            className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
          ></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductAccordion;
