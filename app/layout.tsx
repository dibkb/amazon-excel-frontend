import type { Metadata } from "next";
import { geistMono, manrope } from "./fonts";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";

export const metadata: Metadata = {
  title: "Amazon Excel - Your E-commerce Data Management Solution",
  description:
    "Powerful e-commerce data management and analytics tool. Streamline your Amazon business operations with advanced Excel-like capabilities.",
  keywords:
    "amazon seller, e-commerce analytics, excel data management, amazon business tools",
  authors: [{ name: "DK" }],
  creator: "DK",
  publisher: "DK",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Amazon Excel - E-commerce Enhancement Tools",
    description:
      "Transform your Amazon business with powerful data management and analytics tools",
    type: "website",
    siteName: "Amazon Excel",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Excel - E-commerce Enhancement Tools",
    description:
      "Transform your Amazon business with powerful data management and analytics tools",
  },
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
        <main className={`container mx-auto mt-[60px]`}>{children}</main>
      </body>
    </html>
  );
}
