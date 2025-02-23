import { Progress } from "@/components/ui/progress";
import React from "react";

interface RatingbarProps {
  text: string;
  percentage: number;
}
const Ratingbar = ({ text, percentage }: RatingbarProps) => {
  return (
    <main className="flex items-center gap-2 mt-3 font-bold text-sm">
      <p className="text-blue-700">{text}</p>
      <div className="w-full" style={{ width: "320px" }}>
        <Progress
          value={percentage}
          className="bg-stone-200"
          style={{ height: "10px" }}
        />
      </div>
      <p className="text-blue-700">{`${percentage}%`}</p>
    </main>
  );
};

export default Ratingbar;
