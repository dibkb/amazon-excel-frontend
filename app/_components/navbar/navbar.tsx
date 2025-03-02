"use client";
import { geistMono } from "@/app/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
// import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { data: _session } = useSession();
  const session = _session as unknown as {
    user: {
      username: string;
      image: string;
    };
  };
  const userName = session?.user?.username?.charAt(0).toUpperCase();
  return (
    <div className="flex flex-col justify-center py-4 fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 h-[60px]">
      <div className="container mx-auto flex justify-between items-center">
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
        <Avatar className="">
          <AvatarImage src={session?.user?.image || ""} alt="@shadcn" />
          <AvatarFallback>{userName}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default function NavbarDefault() {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
}
