"use client";
import api from "@/src/axios/base";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import { manrope } from "../fonts";
import { formatIndian } from "@/utils/amazon/format-number";
import axios, { AxiosError } from "axios";

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
  const [retries, setRetries] = useState<number>(0);

  useEffect(() => {
    // Setup cache checking
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products", {
          timeout: 10000, // 10 seconds timeout
        });

        const data = await response.data;
        if (response.status !== 200) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data);
        setError(null);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching products:", err);

        let errorMessage = "Failed to fetch products. Please try again.";
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          errorMessage = axiosError.message || errorMessage;
        } else if (err instanceof Error) {
          errorMessage = err.message;
          setError(errorMessage);
        }

        setLoading(false);
      }
    };

    fetchProducts();
  }, [retries]);

  return (
    <div>
      {loading && (
        <div className="w-full flex justify-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="border border-stone-100 rounded-lg p-4 w-[200px]"
                >
                  <div className="bg-gray-200 h-[100px] w-[100px] mb-4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative my-4">
          <p>{error}</p>
          {retries < 3 && (
            <p className="text-sm mt-2">Retrying automatically...</p>
          )}
          <button
            onClick={() => setRetries((prev) => prev + 1)}
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1 px-3 rounded text-sm"
          >
            Retry Now
          </button>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-8">
          <p className="text-stone-700 mb-4">No products found</p>
          <button
            onClick={() => setRetries((prev) => prev + 1)}
            className="bg-stone-700 hover:bg-stone-900 text-stone-100 font-semibold py-2 px-4 rounded text-sm"
          >
            Reload Products
          </button>
        </div>
      )}

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
              loading="lazy"
            />
            <div
              className={`${manrope.className} text-stone-700 flex flex-col gap-2`}
            >
              <h3 className="text-stone-800 font-bold text-sm line-clamp-2">
                {item?.title}
              </h3>
              <p className="text-amazon-red font-semibold text-xs">
                ₹{formatIndian(Number(item?.price || 0))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
