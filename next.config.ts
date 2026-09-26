import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' https: blob:",
              "frame-src 'self' https://drive.google.com https://open.spotify.com https://www.youtube.com",
              "connect-src 'self' https:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
