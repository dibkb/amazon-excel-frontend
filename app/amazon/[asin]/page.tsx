import ThumbnailAccordion from "@/app/_components/amazon/accordion/thumbnail";
import ProductAccordion from "@/app/_components/amazon/accordion/product";
import { geistMono } from "@/app/fonts";
import { AmazonProductResponse } from "@/src/api";
import api from "@/src/axios/base";

export default async function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const asin = (await params).asin;

  const { data } = (await api.get(`/amazon/${asin}`)) as {
    data: AmazonProductResponse;
  };
  console.log(data);
  return (
    <div>
      <p
        className={`${geistMono.className} text-base text-center font-medium text-stone-800`}
      >
        Showing product for ASIN: {asin}
      </p>
      <ThumbnailAccordion data={data} />
      <ProductAccordion data={data} />
    </div>
  );
}
