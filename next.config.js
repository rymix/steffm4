const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: process.env.NODE_ENV !== "production",
      fileName: process.env.NODE_ENV !== "production",
      minify: process.env.NODE_ENV === "production",
      transpileTemplateLiterals: true,
      pure: true,
    },
  },
  outputFileTracingRoot: path.join(__dirname, "../../"),
  output: "standalone",
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        crypto: false,
        stream: false,
      };
    }

    // Add SVG handling using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
