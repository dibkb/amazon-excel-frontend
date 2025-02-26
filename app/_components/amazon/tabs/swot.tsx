"use client";
import React from "react";

import SelectedProducts from "../accordion/swot/selected-products";
import { productStore } from "@/app/store/productStore";

const Sowt = () => {
  const { product } = productStore();
  return (
    <div className="mt-6">
      <SelectedProducts relatedProducts={product?.product.related_products} />
    </div>
  );
};

export default Sowt;
