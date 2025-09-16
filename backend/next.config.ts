import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // env: {
  //   FindX_MONGODB_URL: process.env.FindX_MONGODB_URL,
  // },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
