import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.pixabay.com",
      },
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
