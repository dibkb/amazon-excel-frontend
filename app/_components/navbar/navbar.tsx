import { geistMono } from "@/app/fonts";
import Link from "next/link";
// import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col justify-center py-4 fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 h-[60px]">
      <div className="container mx-auto">
        <span className="flex items-center gap-2">
          <Link href="/" className={`${geistMono.className} text-base`}>
            ecommerce-excel
          </Link>
          {/* <Image
            src={
              "https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_640.png"
            }
            className="mt-2"
            alt="amazon logo"
            width={60}
            height={60}
          /> */}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
