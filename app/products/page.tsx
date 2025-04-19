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
    const cachedData = localStorage.getItem("cachedProducts");
    const cacheTimestamp = localStorage.getItem("productsCacheTimestamp");
    const now = Date.now();
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    // Use cached data if available and not expired
    if (
      cachedData &&
      cacheTimestamp &&
      now - parseInt(cacheTimestamp) < CACHE_DURATION
    ) {
      setProducts(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

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

        // Cache the results
        localStorage.setItem("cachedProducts", JSON.stringify(data));
        localStorage.setItem("productsCacheTimestamp", now.toString());

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
        }

        // Check if we have cached data to show as fallback
        if (cachedData) {
          setProducts(JSON.parse(cachedData));
          setError("Showing cached data. Could not refresh from server.");
        } else {
          setError(errorMessage);
        }

        setLoading(false);

        // Retry logic (max 3 retries with exponential backoff)
        if (retries < 3) {
          const backoffTime = Math.pow(2, retries) * 1000;
          setTimeout(() => {
            setRetries((prev) => prev + 1);
          }, backoffTime);
        }
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
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.png";
              }}
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
