import { useEffect, useState } from "react";
import { productStore } from "@/app/store/productStore";
import api from "@/src/axios/base";
import { ProductSageResponse } from "@/src/api/models/ProductSageResponse";

export const useFetchImprovements = (asin: string) => {
  const { setImprovements, setLoadingImprovements } = productStore();
  productStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingImprovements(true);
        setLoading(true);
        const { data } = (await api.get(`/amazon/product-sage/${asin}`)) as {
          data: ProductSageResponse;
        };
        setImprovements(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingImprovements(false);
        setLoading(false);
      }
    };
    fetchData();
  }, [asin, setImprovements, setLoadingImprovements]);
  return { loading };
};
