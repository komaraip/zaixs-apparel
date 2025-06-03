import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["hfrwlhcwcnhbwbuvqoqz.supabase.co"],
  },
  experimental: {
    serverActions: {
      // Setting the body size limit to 50MB for handling larger image uploads
      bodySizeLimit: 50 * 1024 * 1024, // 50MB in bytes
    },
  },
};

export default nextConfig;
