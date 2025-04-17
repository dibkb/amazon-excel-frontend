/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import { manrope, ptSerif } from "./fonts";
import Magnifier from "@/svg/magnifier";
import { useState } from "react";
import { validateAsin } from "@/utils/amazon/validateAsin";
import Check from "@/svg/check";
import { useRouter } from "next/navigation";
import { displayData } from "@/src/data";
import Image from "next/image";
import { constructImageUrl } from "@/utils/amazon/construct-image-url";
import { formatIndian } from "@/utils/amazon/format-number";
import { MiniStars } from "./_components/amazon/stars/stars";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<"neutral" | "valid" | "invalid">(
    "neutral"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);

    // Reset validation state when typing
    if (isValid !== "neutral") {
      setIsValid("neutral");
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    try {
      const isValidAsin = validateAsin(input);
      setIsValid(isValidAsin ? "valid" : "invalid");
      if (isValidAsin) {
        setInput(isValidAsin);
        router.push(`/amazon/${isValidAsin}`);
      }
    } catch (error) {
      console.error(error);
      setIsValid("invalid");
    }
  };

  return (
    <main className="flex flex-col items-center justify-start h-[calc(100vh-60px)] pt-[20vh]">
      <section className="flex flex-col items-center justify-center gap-9 w-full max-w-[900px] px-4">
        <h1 className={`${ptSerif.className} font-serif text-6xl text-center`}>
          Amplify Your Amazon Edge
        </h1>
        <p
          className={cn(
            manrope.className,
            "text-center font-semibold text-stone-500 max-w-[700px]"
          )}
        >
          Leverage data-driven product analysis, competitor SWOT insights, and
          A/B testing to refine your listings and boost conversions.
        </p>
        <form
          className="flex flex-col items-center justify-center gap-2 w-full max-w-[700px] mt-20 relative"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="relative w-full">
            <input
              value={input}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Product ASIN or the URL"
              aria-label="Product ASIN or URL"
              className={cn(
                "rounded-full px-8 py-5 font-semibold text-stone-700 w-full border focus:outline-none",
                isValid === "valid"
                  ? "border-green-200 focus:border-green-500 bg-green-50 text-green-700 focus:bg-green-50 hover:border-green-500 focus:ring-offset-green-500"
                  : isValid === "invalid"
                  ? "border-red-200 focus:border-red-500 bg-red-50 text-red-700 focus:bg-red-50 hover:border-red-500 focus:ring-offset-red-500"
                  : "border-blue-200 focus:border-blue-500 bg-blue-50 text-blue-700 focus:bg-blue-50 hover:border-blue-500 focus:ring-offset-blue-500"
              )}
            />

            <button
              type="submit"
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all duration-300",
                isValid === "valid"
                  ? "bg-green-500 hover:bg-green-600"
                  : isValid === "invalid"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              )}
              aria-label="Search ASIN"
            >
              {isValid === "valid" ? (
                <Check className={cn("size-6 text-white")} />
              ) : (
                <Magnifier className={cn("size-6 text-white")} />
              )}
            </button>
          </div>
        </form>
        <div className="mt-12">
          <p className="font-medium text-stone-600 text-sm">
            Top Picks at a Glance
          </p>
          <div className="flex gap-4 mt-4">
            {displayData.map((item, id) => (
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
                  <div className="flex items-center gap-1">
                    <MiniStars rating={Number(item?.rating)} />
                    <span className="text-xs text-cyan-800 font-semibold">
                      {item?.review_count}
                    </span>
                  </div>
                  <p className="text-amazon-red font-semibold text-xs">
                    ₹{formatIndian(Number(item?.price))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
