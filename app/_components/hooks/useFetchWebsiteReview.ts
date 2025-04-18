import { productStore } from "@/app/store/productStore";
import { ReviewSchema } from "@/src/api/models/ReviewSchema";
import api from "@/src/axios/base";
import { useEffect, useState } from "react";

export const useFetchWebsiteReview = (asin: string) => {
  const { setWebsiteReview, setLoadingWebsiteReview } = productStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadingWebsiteReview(true);

        const { data } = await api.get<Array<ReviewSchema>>(
          `/amazon/product-sage/web-reviewer/${asin}`
        );

        setWebsiteReview(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch website review:", error.message);
          setWebsiteReview(null); // or set an error state if available
        }
      } finally {
        setLoading(false);
        setLoadingWebsiteReview(false);
      }
    };

    fetchData();
  }, [asin, setWebsiteReview, setLoadingWebsiteReview]);
  return { loading };
};
