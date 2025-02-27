import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductSageResponse } from "@/src/api/models/ProductSageResponse";
import { Product } from "@/src/api";

interface ProductStore {
  product: Product | null;
  setProduct: (product: Product) => void;
  loadingProduct: boolean;
  setLoadingProduct: (loading: boolean) => void;
  errorProduct: string | null;
  setErrorProduct: (error: string | null) => void;
  asin: string | undefined;
  setAsin: (asin: string) => void;
  improvements: ProductSageResponse | null;
  setImprovements: (improvements: ProductSageResponse) => void;

  selectedProducts: string[];
  setSelectedProducts: (products: string[]) => void;
}

export const productStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: null,
      setProduct: (product: Product) => set({ product }),
      loadingProduct: true,
      setLoadingProduct: (loading: boolean) => set({ loadingProduct: loading }),
      errorProduct: null,
      setErrorProduct: (error: string | null) => set({ errorProduct: error }),
      asin: undefined,
      setAsin: (asin: string) => set({ asin }),
      improvements: null,
      setImprovements: (improvements: ProductSageResponse) =>
        set({ improvements }),
      selectedProducts: [],
      setSelectedProducts: (products: string[]) =>
        set({ selectedProducts: products }),
    }),
    {
      name: "ecommerce/excel",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        product: state.product,
        asin: state.asin,
        improvements: state.improvements,
      }),
    }
  )
);
