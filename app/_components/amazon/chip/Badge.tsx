import React from "react";

interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  switch (text) {
    case "High":
      return (
        <div className="bg-red-200 text-red-700 px-4 text-xs font-bold py-1 rounded-full w-min">
          High
        </div>
      );
    case "Medium":
      return (
        <div className="bg-amber-200 text-amber-700 px-4 py-1 text-xs font-bold rounded-full w-min">
          Medium
        </div>
      );
    default:
      return (
        <div className="bg-lime-200 text-lime-700 px-4 py-1 text-xs font-bold rounded-full w-min">
          Low
        </div>
      );
  }
};

export default Badge;
