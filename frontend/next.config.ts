import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
<<<<<<< HEAD
=======
      },
      {
        protocol: "http",
        hostname: "avatar.png",
        port: "",
        pathname: "/**",
>>>>>>> b0c5bc1 (header and ranks fixed)
      },
    ],
  },
  // Vercel optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Optimize bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
