import type { NextConfig } from 'next';
import path from 'path';

// Configure Next.js runtime/build behavior for this project.
const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack root locked to this workspace directory.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
