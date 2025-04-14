/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Content-Type',
              value: 'multipart/form-data',
            },
          ],
        },
      ]
    },
    experimental: {
      serverActions: true
    }
  }
  
  module.exports = nextConfig