"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Features = ({ features }: { features: string }) => {
  const featuresArray = features.split(",");
  if (featuresArray.length === 0) return null;
  if (featuresArray.length === 1 && featuresArray[0] === "") return null;
  return (
    <div className="flex flex-wrap gap-2">
      {featuresArray.map((feature, id) => (
        <Badge
          key={id + feature}
          variant="secondary"
          className="px-2 py-1 lowercase"
        >
          {feature}
        </Badge>
      ))}
    </div>
  );
};

export default Features;
