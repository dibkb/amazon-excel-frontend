import ThumbnailAccordion from "@/app/_components/amazon/accordion/thumbnail";
import ProductAccordion from "@/app/_components/amazon/accordion/product";
import { geistMono } from "@/app/fonts";
import { AmazonProductResponse } from "@/src/api";
import api from "@/src/axios/base";
import ProductHighlights from "@/app/_components/amazon/highlights/highlights";
import ProductInformation from "@/app/_components/amazon/product-information/product-information";
import Reviews from "@/app/_components/amazon/reviews/reviews";

export default async function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const asin = (await params).asin;

  const { data } = (await api.get(`/amazon/${asin}`)) as {
    data: AmazonProductResponse;
  };
  return (
    <div>
      <p
        className={`${geistMono.className} text-base text-center font-medium text-stone-800`}
      >
        Showing product for ASIN: {asin}
      </p>
      {data && (
        <>
          <ThumbnailAccordion data={data} />
          <ProductAccordion data={data} />
          <ProductHighlights
            highlights={data.product.description?.highlights ?? []}
          />
          <ProductInformation data={data} />
          <Reviews data={data} />
        </>
      )}
    </div>
  );
}
