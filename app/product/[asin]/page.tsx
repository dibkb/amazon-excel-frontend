import { geistMono } from "@/app/fonts";

export default async function AsinPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const asin = (await params).asin;
  return (
    <div>
      <p
        className={`${geistMono.className} text-base text-center font-medium text-stone-800`}
      >
        Showing product for ASIN: {asin}
      </p>
    </div>
  );
}
