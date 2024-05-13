const path = require("path");

module.exports = {
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  output: "standalone",
  reactStrictMode: false,
  swcMinify: true,
};
