/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/explore/:path*",
        destination: "http://localhost:3001/explore/:path*",
      },
      {
        source: "/blog/:path*",
        destination: "http://localhost:3002/blog/:path*",
      },
    ];
  },
};

export default nextConfig;
