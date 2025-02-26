import api from "@/src/axios/base";

import { ProductSageResponse } from "@/src/api";
import { useEffect } from "react";
import { productStore } from "@/app/store/productStore";
export const useFetchImprovements = (asin: string) => {
  const { setImprovements } = productStore();
  productStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = (await api.get(`/amazon/product-sage/${asin}`)) as {
          data: ProductSageResponse;
        };
        setImprovements(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [asin, setImprovements]);
};
