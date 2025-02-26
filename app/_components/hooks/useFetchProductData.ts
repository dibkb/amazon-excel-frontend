import api from "@/src/axios/base";

import { AmazonProductResponse } from "@/src/api";
import { useEffect } from "react";
import { productStore } from "@/app/store/productStore";
export const useFetchProductData = (asin: string) => {
  const { setProduct, setLoadingProduct, setErrorProduct, setAsin } =
    productStore();
  useEffect(() => {
    const fetchData = async () => {
      setLoadingProduct(true);
      setErrorProduct(null);
      try {
        const { data } = (await api.get(`/amazon/${asin}`)) as {
          data: AmazonProductResponse;
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
  }, [asin, setProduct, setLoadingProduct, setErrorProduct, setAsin]);
};
