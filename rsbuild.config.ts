import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'vritti_auth',
      exposes: {
        './routes': './src/routes.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
          eager: true,
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
        },
        '@vritti/quantum-ui': {
          singleton: true,
          eager: true,
        },
        axios: {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
  tools: {
    postcss: (config) => {
      config.postcssOptions = {
        plugins: ['tailwindcss', 'autoprefixer'],
      };
    },
  },
});
