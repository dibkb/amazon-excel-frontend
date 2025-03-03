import api from "@/src/axios/base";
import { useCallback, useState } from "react";
import { ProductEnhancements, productStore } from "@/app/store/productStore";
import { Product } from "@/src/api/models/Product";
export const useEnhanceProduct = (asin: string | undefined) => {
  const { setProductEnhancements, product } = productStore();
  const [loading, setLoading] = useState(false);
  const enhanceProduct = useCallback(async () => {
    if (!asin) return;
    try {
      setLoading(true);
      const { data } = (await api.get(
        `/amazon/product-enhancements/${asin}`
      )) as {
        data: ProductEnhancements;
      };
      const productEnhanced: Product = {
        ...product,
        title: data.enhancements.title,
        description: {
          highlights: data.enhancements.highlights,
        },
        specifications: {
          technical: data.enhancements.technical,
          additional: data.enhancements.additional,
        },
      };

      setProductEnhancements(productEnhanced);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [setProductEnhancements, asin, product]);

  return { enhanceProduct, loading };
};
