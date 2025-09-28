import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-70284751a4884f90bf14b3714880cdef.r2.dev',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'dark-world.ru',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
