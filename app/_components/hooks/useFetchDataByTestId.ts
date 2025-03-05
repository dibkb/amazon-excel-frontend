import { Product } from "@/src/api/models/Product";
import {
  ApiResponseEnhancements,
  ProductEnhancements,
} from "@/app/store/productStore";
import { getTestById } from "@/db/query/test";
import api from "@/src/axios/base";
import { enhanceDetails } from "@/utils/amazon/enhance-details";
import { useEffect, useState } from "react";

interface FetchDataState {
  productData: Product | null;
  enhancedProductData: ProductEnhancements | null;
  isLoading: boolean;
  error: Error | null;
}

const initialState: FetchDataState = {
  productData: null,
  enhancedProductData: null,
  isLoading: false,
  error: null,
};

export const useFetchDataByTestId = (testId: string) => {
  const [state, setState] = useState<FetchDataState>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const test = await getTestById(testId);

        if (!test) {
          throw new Error(`Test with ID ${testId} not found`);
        }

        const [productResponse, enhancementsResponse] = await Promise.all([
          api.get(`/amazon/${test.asin}`),
          api.get(`/amazon/product-enhancements/${test.asin}`),
        ]);

        const product: Product = productResponse.data;
        const enhancements: ApiResponseEnhancements = enhancementsResponse.data;

        if (!product || !enhancements) {
          throw new Error("Failed to fetch product data or enhancements");
        }

        const productEnhanced: ProductEnhancements = {
          ...product,
          title: enhancements.enhancements.title,
          description: {
            highlights: enhancements.enhancements.highlights,
          },
          specifications: {
            technical: enhanceDetails(
              product?.specifications?.technical || {},
              enhancements.enhancements.technical
            ),
            additional: enhanceDetails(
              product?.specifications?.additional || {},
              enhancements.enhancements.additional
            ),
          },
          source: enhancements.enhancements.source,
        };

        setState({
          productData: product,
          enhancedProductData: productEnhanced,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("An unknown error occurred"),
        }));
      }
    };

    fetchData();
  }, [testId]);

  return state;
};
