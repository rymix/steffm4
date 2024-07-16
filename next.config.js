const path = require("path");
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
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
};

module.exports = nextConfig;
