"use client";
import api from "@/src/axios/base";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import { manrope } from "../fonts";
import { formatIndian } from "@/utils/amazon/format-number";
interface Product {
  asin: string;
  title: string;
  price: string;
  image: string;
}

const Homepage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products");
      const data = await response.data;
      if (response.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-4">
        {products.map((item, id) => (
          <Link
            key={id + item.asin}
            href={`/amazon/${item.asin}`}
            className="flex flex-col items-center justify-center gap-2 max-w-[200px] border border-stone-100 rounded-lg p-2 hover:border-stone-300 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={constructImageUrl(item?.image ?? "")}
              alt={item?.title || "Product thumbnail"}
              width={100}
              height={100}
              className="min-w-[100px] min-h-[100px]"
            />
            <div
              className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
            >
              <h3 className="text-stone-800 font-bold text-sm line-clamp-2">
                {item?.title}
              </h3>
              <p className="text-amazon-red font-semibold text-xs">
                ₹{formatIndian(Number(item?.price))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
