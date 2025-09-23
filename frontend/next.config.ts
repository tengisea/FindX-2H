import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "http",
        hostname: "avatar.png",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.grok.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Vercel optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
