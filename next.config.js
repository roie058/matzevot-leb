/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: [
      "matzevot.s3.eu-central-1.amazonaws.com",
      "s3.eu-central-1.amazonaws.com",
      "s3.amazonaws.com",
      "matzevot.s3.amazonaws.com",
      "matzevot.amazonaws.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({});
