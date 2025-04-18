"use client";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
interface ProductImages {
  images: string[];
}
const ProductImages = ({ images }: ProductImages) => {
  const [thumbnail, setThumbnail] = React.useState<string>(images?.[0] ?? "");
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-2">
        {images?.map((img, id) => (
          <span
            key={id + img}
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
              thumbnail === img ? "border-blue-500 border-2" : "border-gray-200"
            }`}
          >
            <AspectRatio ratio={1}>
              <Image
                src={constructImageUrl(img, 100)}
                alt="Product thumbnail"
                width={40}
                height={40}
              />
            </AspectRatio>
          </span>
        ))}
      </div>
      <div
        style={{
          width: "550px",
          height: "550px",
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="border border-stone-200 p-2 rounded-md transition-all object-contain max-h-full w-auto"
      >
        <AspectRatio ratio={1}>
          <Image
            src={constructImageUrl(thumbnail, 1500)}
            alt="Thumbnail"
            width={550}
            height={550}
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default ProductImages;
