"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AmazonProductResponse } from "@/src/api/models/AmazonProductResponse";
import React from "react";
import Stars from "../stars/stars";

const ReviewsList = ({
  reviews,
}: {
  reviews: AmazonProductResponse["product"]["reviews"];
}) => {
  const reviewContent = reviews?.map((review) => {
    return (
      <main key={review.title} className="flex flex-col gap-3">
        <span className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={`https://avatar.iran.liara.run/username?username=${review.user}`}
              alt={review.user ?? ""}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-xs font-semibold text-stone-600">{review.user}</p>
        </span>
        <span className="flex items-center gap-2">
          <Stars rating={Number(review.rating)} />
          <p className="text-sm font-bold text-stone-800">{review.title}</p>
        </span>
        <p className="italic font-semibold text-sm text-stone-600">
          Reviewed on {review.date}
        </p>
        <p className="text-sm font-medium text-stone-600">{review.text}</p>
      </main>
    );
  });
  return (
    <div className="flex w-full items-center my-4">
      <main className="flex flex-col gap-4">{reviewContent}</main>
    </div>
  );
};

export default ReviewsList;
