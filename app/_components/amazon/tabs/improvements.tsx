"use client";
import SuggestedImprovements from "../accordion/imporovements/suggested-improvements";
import CommentSentiment from "../accordion/imporovements/comment-sentiment";

export default function Improvements() {
  return (
    <div className="flex flex-col gap-3">
      <SuggestedImprovements />
      <CommentSentiment />
    </div>
  );
}
