import { productStore } from "@/app/store/productStore";
import { ReviewSchema } from "@/src/api/models/ReviewSchema";
import api from "@/src/axios/base";
import { useEffect } from "react";

export const useFetchWebsiteReview = (asin: string) => {
  const { setWebsiteReview, setLoadingWebsiteReview } = productStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setLoadingWebsiteReview(false);
      }
    };

    fetchData();
  }, [asin, setWebsiteReview, setLoadingWebsiteReview]);
};
