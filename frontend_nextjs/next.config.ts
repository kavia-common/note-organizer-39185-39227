import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export enabled; dev server runs on default 3000
  output: "export",
  // Keep flexible for hosting; no hard-coding of env here.
};

export default nextConfig;
