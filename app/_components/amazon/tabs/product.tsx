"use client";
import { geistMono } from "@/app/fonts";
import React from "react";
import ThumbnailAccordion from "../accordion/thumbnail";
import ProductAccordion from "../accordion/product";
import ProductHighlights from "../highlights/highlights";
import ProductInformation from "../product-information/product-information";
import Reviews from "../reviews/reviews";
import { AmazonProductResponse } from "@/src/api/models/AmazonProductResponse";

interface Product {
  data: AmazonProductResponse;
  asin: string;
}
const Product = ({ data, asin }: Product) => {
  return (
    <div>
      <div>
        <p
          className={`${geistMono.className} text-base text-center font-medium text-stone-800 mt-6`}
        >
          Showing product for ASIN: {asin}
        </p>
        {data && (
          <>
            <ThumbnailAccordion data={data} />
            <ProductAccordion data={data} />
            <ProductHighlights
              highlights={data.product.description?.highlights ?? []}
            />
            <ProductInformation data={data} />
            <Reviews data={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
