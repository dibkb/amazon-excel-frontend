"use client";
import SuggestedImprovements from "../accordion/imporovements/suggested-improvements";
import CommentSentiment from "../accordion/imporovements/comment-sentiment";
import WebsiteReviews from "../accordion/imporovements/website-reviews";
export default function Improvements() {
  return (
    <div className="flex flex-col gap-3">
      <SuggestedImprovements />
      <CommentSentiment />
      <WebsiteReviews />
    </div>
  );
}
