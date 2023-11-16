/**
 * Load dependencies.
 */
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { cwd } from 'process';
import { defineConfig, loadEnv } from 'vite';
import { description, version } from './package.json';

/**
 * Vite configuration.
 */
export default defineConfig(({ mode }) => {
  // load env
  const env = loadEnv(mode, cwd(), '');
  // expose
  return {
    build: {
      emptyOutDir: true,
    },
    clearScreen: false,
    define: {
      APP_DESCRIPTION: JSON.stringify(description),
      APP_VERSION: JSON.stringify(version),
    },
    plugins: [
      svelte(),
    ],
    server: {
      host: env.HOST,
      port: parseInt(env.PORT || '8080', 10),
      strictPort: true,
      hmr: {
        clientPort: parseInt(env.HMR_CLIENT_PORT || env.PORT || '8080', 10),
      },
    },
  };
});
