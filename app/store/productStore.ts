import { AmazonProductResponse } from "@/src/api/models/AmazonProductResponse";
import { create } from "zustand";

interface ProductStore {
  product: AmazonProductResponse | null;
  setProduct: (product: AmazonProductResponse) => void;
  loadingProduct: boolean;
  setLoadingProduct: (loading: boolean) => void;
  errorProduct: string | null;
  setErrorProduct: (error: string | null) => void;
  asin: string | undefined;
  setAsin: (asin: string) => void;
}

export const productStore = create<ProductStore>((set) => ({
  product: null,
  setProduct: (product: AmazonProductResponse) => set({ product }),
  loadingProduct: true,
  setLoadingProduct: (loading: boolean) => set({ loadingProduct: loading }),
  errorProduct: null,
  setErrorProduct: (error: string | null) => set({ errorProduct: error }),
  asin: undefined,
  setAsin: (asin: string) => set({ asin }),
}));
