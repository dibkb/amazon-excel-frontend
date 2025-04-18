"use client";
import SuggestedImprovements from "../accordion/imporovements/suggested-improvements";
import CommentSentiment from "../accordion/imporovements/comment-sentiment";
import WebsiteReviews from "../accordion/imporovements/website-reviews";
import { useFetchImprovements } from "../../hooks/useFetchImprvements";
import { useFetchWebsiteReview } from "../../hooks/useFetchWebsiteReview";
import Image from "next/image";
const LoadingContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <Image
        src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
        alt="Loading..."
        width={20}
        height={20}
        priority
      />
      <p className="text-sm text-stone-500">{children}</p>
    </div>
  );
};

export default function Improvements({ asin }: { asin: string }) {
  const { loading: loadingImprovements } = useFetchImprovements(asin);
  const { loading: loadingWebsiteReview } = useFetchWebsiteReview(asin);
  return (
    <div className="flex flex-col gap-3">
      {loadingImprovements ? (
        <LoadingContent>
          Analyzing product info and generating improvements...
        </LoadingContent>
      ) : (
        <>
          <SuggestedImprovements />
          <CommentSentiment />
        </>
      )}
      {loadingWebsiteReview ? (
        <LoadingContent>Analyzing reviews from the web...</LoadingContent>
      ) : (
        <WebsiteReviews />
      )}
    </div>
  );
}
