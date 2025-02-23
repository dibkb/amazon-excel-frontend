import type { Metadata } from "next";
import { geistMono, manrope } from "./fonts";
import "./globals.css";
import Image from "next/image";
export const metadata: Metadata = {
  title: "ecommerce/excel",
  description: "ecommerce/excel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} ${manrope.variable} antialiased`}>
        <div className="flex flex-col justify-center container mx-auto py-4">
          <span className="flex items-center gap-2">
            <h2 className={`${geistMono.className} text-base`}>dibkb/</h2>
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
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
