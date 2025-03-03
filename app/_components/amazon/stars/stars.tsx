"use client";
import React from "react";
import { Ratings } from "@/src/api";
import { Star } from "lucide-react";
import StarFull from "@/svg/StarFull";
interface StarsProps {
  rating: Ratings["rating"];
}
const Stars = ({ rating }: StarsProps) => {
  const ratedStars = Array.from(
    {
      length: Math.floor(rating ?? 0),
    },
    (_, index) => <StarFull key={index} className="text-yellow-600 size-4" />
  );
  const unratedStars = Array.from(
    {
      length: 5 - Math.floor(rating ?? 0),
    },
    (_, index) => <Star key={index} className="size-4 text-yellow-600" />
  );
  return (
    <div className="flex items-center gap-[1.5px]">
      {ratedStars}
      {unratedStars}
    </div>
  );
};

export default Stars;
