"use client";
import { geistMono } from "@/app/fonts";
import React from "react";
import ThumbnailAccordion from "../accordion/thumbnail";
import ProductAccordion from "../accordion/product";
import ProductHighlights from "../highlights/highlights";
import ProductInformation from "../product-information/product-information";
import Reviews from "../reviews/reviews";
import { productStore } from "@/app/store/productStore";

const Product = () => {
  const { product, asin } = productStore();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <p
          className={`${geistMono.className} text-base text-center font-medium text-stone-800 mt-6`}
        >
          Showing product for ASIN: {asin}
        </p>
        {product && (
          <>
            <ThumbnailAccordion product={product} />
            <ProductAccordion product={product} />
            <ProductHighlights product={product} />
            <ProductInformation product={product} />
            <Reviews product={product} />
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
