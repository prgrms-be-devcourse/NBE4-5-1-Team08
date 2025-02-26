import {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ["localhost"], // ✅ "localhost" 추가
    },
};

module.exports = nextConfig;