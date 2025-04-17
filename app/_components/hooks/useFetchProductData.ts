import api from "@/src/axios/base";
import { Product } from "@/src/api/models/Product";
import { useEffect } from "react";
import { productStore } from "@/app/store/productStore";
export const useFetchProductData = (asin: string) => {
  const {
    setProduct,
    setLoadingProduct,
    setErrorProduct,
    setAsin,
    setProductEnhancements,
    setSelectedProducts,
    setSwot,
  } = productStore();
  useEffect(() => {
    const fetchData = async () => {
      setLoadingProduct(true);
      setErrorProduct(null);
      try {
        const { data } = (await api.get(`/amazon/${asin}`)) as {
          data: Product;
        };
        setAsin(asin);
        setProduct(data);
        setSelectedProducts([]);
        setSwot(null);
        setProductEnhancements(null);
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
    setSelectedProducts,
    setSwot,
  ]);
};
