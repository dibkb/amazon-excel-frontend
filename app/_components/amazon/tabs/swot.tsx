"use client";
import { AmazonProductResponse } from "@/src/api/models/AmazonProductResponse";
import React from "react";

import SelectedProducts from "../accordion/swot/selected-products";

interface SowtProps {
  data: AmazonProductResponse;
}

const Sowt = ({ data }: SowtProps) => {
  return (
    <div className="mt-6">
      <SelectedProducts relatedProducts={data.product.related_products} />
    </div>
  );
};

export default Sowt;
