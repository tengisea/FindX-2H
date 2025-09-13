import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // env: {
  //   FindX_MONGODB_URL: process.env.FindX_MONGODB_URL,
  // },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
