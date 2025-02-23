import React from "react";

const ProductRow = ({ row, value }: { row: string; value: string }) => {
  return (
    <div className="grid grid-cols-2 gap-1 border-b p-2 text-sm">
      <p className="font-bold">{row}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default ProductRow;
