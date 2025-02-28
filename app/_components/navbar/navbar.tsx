import { geistMono } from "@/app/fonts";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col justify-center container mx-auto py-4">
      <span className="flex items-center gap-2">
        <h2 className={`${geistMono.className} text-base`}>ecommerce-excel/</h2>
        <Image
          src={
            "https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_640.png"
          }
          className="mt-2"
          alt="amazon logo"
          width={60}
          height={60}
        />
      </span>
    </div>
  );
};

export default Navbar;
