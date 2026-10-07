import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', images: { unoptimized: true }, devIndicators: false, outputFileTracingRoot: process.cwd() };
export default config;
