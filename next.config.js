/* eslint-disable @typescript-eslint/no-var-requires */

const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    reactStrictMode: true,
    images: {
        domains: ['s2.coinmarketcap.com'],
    },
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development',
    },
})
