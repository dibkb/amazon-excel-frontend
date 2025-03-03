import api from "@/src/axios/base";

import { Product } from "@/src/api";
import { useEffect } from "react";
import { productStore } from "@/app/store/productStore";
export const useFetchProductData = (asin: string) => {
  const {
    setProduct,
    setLoadingProduct,
    setErrorProduct,
    setAsin,
    setProductEnhancements,
  } = productStore();
  useEffect(() => {
    const fetchData = async () => {
      setLoadingProduct(true);
      setProductEnhancements(null);
      setErrorProduct(null);
      try {
        const { data } = (await api.get(`/amazon/${asin}`)) as {
          data: Product;
        };
        setAsin(asin);
        setProduct(data);
        setLoadingProduct(false);
      } catch (error) {
        setErrorProduct(error as string);
        setLoadingProduct(false);
      }
    };
    fetchData();
  }, [
    asin,
    setProduct,
    setLoadingProduct,
    setErrorProduct,
    setAsin,
    setProductEnhancements,
  ]);
};
