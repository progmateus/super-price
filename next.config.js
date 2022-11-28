/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
            key: 'Content-Security-Policy',
            value:
              "default-src [52.90.220.102] 'self' data: 'unsafe-inline'"
          }
        ]
      }
    ]
  }
}
