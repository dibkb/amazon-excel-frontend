import type { Metadata } from "next";
import { geistMono, manrope } from "./fonts";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";
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
      <body
        className={`${geistMono.variable} ${manrope.variable} antialiased flex flex-col`}
      >
        <Navbar />
        <main className="container mx-auto mt-[60px]">{children}</main>
      </body>
    </html>
  );
}
