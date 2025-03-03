"use client";
import { formatIndian } from "@/utils/amazon/format-number";
import React from "react";

interface PriceProps {
  price: number;
}

const Price = ({ price }: PriceProps) => {
  return (
    <>
      <p className="text-stone-900 text-2xl font-semibold">
        ₹{formatIndian(price ?? 0)}
      </p>
      <p className="text-stone-500 text-sm font-semibold">
        Inclusive of all taxes
      </p>
      <span className="">
        With <span className="text-stone-800 font-bold">Amazon Business</span>,
        you would have{" "}
        <span className="text-stone-800 font-bold">saved ₹1,631.51</span> in the
        last year.{" "}
        <span className="text-cyan-800 font-bold">Create a free account</span>{" "}
        and <span className="text-stone-800 font-bold">save up to 15%</span>{" "}
        today.
      </span>
    </>
  );
};

export default Price;
