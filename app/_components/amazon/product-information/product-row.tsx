"use client";
import React from "react";

const bannedKeys = ["Customer Reviews"];
const ProductRow = ({ row, value }: { row: string; value: string }) => {
  if (bannedKeys.includes(row)) return null;
  let valueContent;
  if (row === "Best Sellers Rank") {
    valueContent = (
      <span className="flex flex-col gap-1">
        {value
          .split("#")
          .slice(1)
          .map((ele, id) => {
            return (
              <p key={id + ele} className="font-semibold text-blue-700">
                #{ele}
              </p>
            );
          })}
      </span>
    );
  } else {
    valueContent = <p className="font-medium">{value}</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-1 border-b p-2 text-sm">
      <p className="font-bold">{row}</p>
      {valueContent}
    </div>
  );
};

export default ProductRow;
