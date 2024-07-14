const path = require("path");
const webpack = require("webpack"); // Ensure webpack is imported

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  output: "standalone",
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        crypto: false,
        stream: false,
      };
    }

    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
