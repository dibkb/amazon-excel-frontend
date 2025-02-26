import React from "react";

interface BadgeProps {
  text: string;
}

const Sentiment = ({ text }: BadgeProps) => {
  const baseClassname = "px-4 text-xs font-bold py-1 rounded-full w-min";
  switch (text) {
    case "Positive":
      return (
        <div className={`${baseClassname} bg-lime-200 text-green-600`}>
          Positive
        </div>
      );
    case "Negative":
      return (
        <div className={`${baseClassname} bg-red-200 text-red-600`}>
          Negative
        </div>
      );
    default:
      return (
        <div className={`${baseClassname} bg-amber-200 text-amber-600`}>
          Neutral
        </div>
      );
  }
};

export default Sentiment;
