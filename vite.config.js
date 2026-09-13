import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'FORM0_');
  const form0DevApiTarget = env.FORM0_DEV_API_URL || 'http://localhost:3030';

  return {
    server: {
      fs: {
        // Allow serving files from parent directory (for local file dependencies)
        allow: ['..'],
      },
      proxy: {
        '/api': {
          target: form0DevApiTarget,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      // preserveSymlinks: true,
      alias: {
        react: path.resolve(import.meta.dirname, 'node_modules/react'),
        'react-dom': path.resolve(import.meta.dirname, 'node_modules/react-dom'),
        '@vanilla-extract/css': path.resolve(
          import.meta.dirname,
          'node_modules/@vanilla-extract/css'
        ),
        '@vanilla-extract/vite-plugin': path.resolve(
          import.meta.dirname,
          'node_modules/@vanilla-extract/vite-plugin'
        ),
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    optimizeDeps: {
      // Exclude to prevent Vite dep optimizer from moving engine-worker.js
      // into .vite/deps, where it isn't emitted.
      exclude: ['form0-react'],
    },
    plugins: [react(), vanillaExtractPlugin(), tailwindcss()],
  };
});
