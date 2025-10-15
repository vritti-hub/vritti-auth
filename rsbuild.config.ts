import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    pluginReact(),
    // pluginModuleFederation({
    //   name: 'vritti_auth',
    //   exposes: {
    //     './routes': './src/routes.tsx',
    //   },
    //   shared: {
    //     react: {
    //       singleton: true,
    //       requiredVersion: '^19.0.0',
    //     },
    //     'react-dom': {
    //       singleton: true,
    //       requiredVersion: '^19.0.0',
    //     },
    //     'react-router-dom': {
    //       singleton: true,
    //     },
    //     '@vritti/quantum-ui': {
    //       singleton: true,
    //       requiredVersion: '0.1.5',
    //     },
    //   },
    // }),
  ],
  tools: {
    postcss: (config) => {
      config.postcssOptions = {
        plugins: ['tailwindcss', 'autoprefixer'],
      };
    },
  },
});
