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
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "tenor.com",
      },
      {
        hostname: "media.tenor.com",
      },
    ],
  },
};

export default nextConfig;
