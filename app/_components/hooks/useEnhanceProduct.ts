import api from "@/src/axios/base";
import { useCallback, useState } from "react";
import {
  ApiResponseEnhancements,
  productStore,
  ProductEnhancements,
} from "@/app/store/productStore";
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
        data: ApiResponseEnhancements;
      };
      const productEnhanced: ProductEnhancements = {
        ...product,
        title: data.enhancements.title,
        description: {
          highlights: data.enhancements.highlights,
        },
        specifications: {
          technical: data.enhancements.technical,
          additional: data.enhancements.additional,
        },
        source: data.enhancements.source,
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
