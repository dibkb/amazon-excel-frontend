"use client";
import React, { useMemo } from "react";

import SelectedProducts from "../accordion/swot/selected-products";
import { productStore } from "@/app/store/productStore";
import { Competitor } from "@/src/api/models/Competitor";
const Sowt = () => {
  const { product } = productStore();
  const relatedProducts = useMemo(() => {
    const set = new Set();
    const relatedProducts = product?.product.related_products;
    const uniqueRelatedProducts: Competitor[] = [];
    relatedProducts?.forEach((product) => {
      if (!set.has(product.asin)) {
        set.add(product.asin);
        uniqueRelatedProducts.push(product);
      }
    });
    return uniqueRelatedProducts;
  }, [product]);
  return (
    <div className="mt-6">
      <SelectedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default Sowt;
