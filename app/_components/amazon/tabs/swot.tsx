"use client";
import React, { useMemo, useState } from "react";

import SelectedProducts from "../accordion/swot/selected-products";
import { productStore } from "@/app/store/productStore";
import { Competitor } from "@/src/api/models/Competitor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { geistMono, manrope } from "@/app/fonts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SwotRender } from "../swot-render";
import api from "@/src/axios/base";
const Sowt = () => {
  const { product, selectedProducts, swot, setSwot, asin } = productStore();
  const [loading, setLoading] = useState(false);
  const relatedProducts = useMemo(() => {
    const set = new Set();
    const relatedProducts = product?.related_products;
    const uniqueRelatedProducts: Competitor[] = [];
    relatedProducts?.forEach((product) => {
      if (!set.has(product.asin)) {
        set.add(product.asin);
        uniqueRelatedProducts.push(product);
      }
    });
    return uniqueRelatedProducts;
  }, [product]);
  const [swotType, setSwotType] = useState<"single" | "consolidated">(
    "consolidated"
  );
  const handleAnalyze = async () => {
    setSwot(null);
    setLoading(true);
    try {
      const swot = await api.get(
        `/amazon/swot-consolidated/${asin}?competitors=${selectedProducts.join(
          ","
        )}`
      );
      setSwot(swot.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const selectSwotContent = (
    <div className="mt-6">
      <SelectedProducts relatedProducts={relatedProducts} />
      <Dialog>
        <DialogTrigger className="fixed bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <span
            className={cn(
              "bg-stone-700 px-6 py-2 font-medium rounded-xl text-lg text-white shadow-md",
              manrope.className,
              "hover:bg-stone-800"
            )}
          >
            Analyze
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={manrope.className}>
              You selected {selectedProducts.length} products
            </DialogTitle>
            <span className={cn(geistMono.className, "mt-4 text-sm py-2")}>
              Selected ASINs: {selectedProducts.join(", ")}
            </span>
            <p className="text-sm py-2 font-medium text-stone-600">
              Choose One
            </p>
            <RadioGroup
              defaultValue={swotType}
              onValueChange={(value) =>
                setSwotType(value as "single" | "consolidated")
              }
            >
              <div className={cn("flex items-center space-x-2", "opacity-50")}>
                <RadioGroupItem value="single" id="r1" disabled={true} />
                <Label htmlFor="r1">One-on-One SWOT</Label>
              </div>
              <div
                className={cn(
                  "flex items-center space-x-2",
                  selectedProducts.length < 1 && "opacity-50"
                )}
              >
                <RadioGroupItem
                  value="consolidated"
                  id="r2"
                  disabled={selectedProducts.length < 1}
                />
                <Label htmlFor="r2">Consolidated SWOT</Label>
              </div>
            </RadioGroup>
          </DialogHeader>
          <Button
            onClick={handleAnalyze}
            className="w-full mt-4"
            disabled={selectedProducts.length < 1 || loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
  return swot ? (
    <SwotRender swot={swot} selectedProducts={selectedProducts} />
  ) : (
    selectSwotContent
  );
};

export default Sowt;
