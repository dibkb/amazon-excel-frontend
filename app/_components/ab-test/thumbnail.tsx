import { Product } from "@/src/api/models/Product";
import React from "react";
import Image from "next/image";
import { manrope } from "@/app/fonts";

import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import { formatIndian } from "@/utils/amazon/format-number";
import Stars from "../amazon/stars/stars";

const Thumbnail = ({ product }: { product: Product }) => {
  return (
    <div className="flex gap-3">
      <Image
        src={constructImageUrl(product?.image?.[0] ?? "")}
        alt={product?.title || "Product thumbnail"}
        width={200}
        height={200}
        className="min-w-[200px] min-h-[200px]"
      />
      <div
        className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
      >
        <h3 className="text-stone-800 font-bold text-lg">{product?.title}</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
