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
      setProduct(null);
      setErrorProduct(null);
      try {
        const response = await api.get(`/amazon/${asin}`);
        if (response.status === 200) {
          setAsin(asin);
          setProduct(response.data as Product);
          setSelectedProducts([]);
          setSwot(null);
          setProductEnhancements(null);
          setLoadingProduct(false);
        } else {
          setErrorProduct(response.data.message as string);
          console.log(response.data.message);
          setLoadingProduct(false);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setErrorProduct(errorMessage);
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
