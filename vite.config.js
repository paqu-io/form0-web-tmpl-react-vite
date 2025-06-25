// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    // preserveSymlinks: true,
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@vanilla-extract/css': path.resolve(__dirname, 'node_modules/@vanilla-extract/css'),
      '@vanilla-extract/vite-plugin': path.resolve(__dirname, 'node_modules/@vanilla-extract/vite-plugin'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  // optimizeDeps: {
  //   exclude: ['form0-react'], // 👈 exclude symlinked lib ONLY
  // },
  // ssr: {
  //   noExternal: ['form0-react'],
  // },
  plugins: [react(), vanillaExtractPlugin(), tailwindcss()],
});