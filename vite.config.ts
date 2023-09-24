import { resolve } from 'path';
import { PluginOption, build, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import { OUTPUT_FOLDER_NAME } from './utils/constants';
import { makeManifest } from './utils/plugins/make-manifest';
import { colorLog } from './utils/log';

const outDir = resolve(__dirname, OUTPUT_FOLDER_NAME);
const publicDir = resolve(__dirname, 'public');
const srcDir = resolve(__dirname, 'src');

const assetsDir = resolve(srcDir, 'assets');
const stylesDir = resolve(srcDir, 'styles');
const modelsDir = resolve(srcDir, 'models');
const utilsDir = resolve(srcDir, 'utils');
const hooksDir = resolve(srcDir, 'hooks');
const pagesDir = resolve(srcDir, 'pages');
const componentsDir = resolve(srcDir, 'components');
const storeDir = resolve(srcDir, 'store');

const alias = {
  '@assets': assetsDir,
  '@styles': stylesDir,
  '@models': modelsDir,
  '@utils': utilsDir,
  '@hooks': hooksDir,
  '@components': componentsDir,
  '@pages': pagesDir,
  '@store': storeDir,
};

const packages = [
  {
    content: resolve('src/pages/content/index.tsx'),
  },
];

const buildContentScript = (): PluginOption => {
  return {
    name: 'build-content',
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          resolve: {
            alias,
          },
          plugins: [svgr({ exportAsDefault: true }), cssInjectedByJsPlugin()],
          build: {
            outDir,
            sourcemap: process.env.__DEV__ === 'true',
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: chunk => {
                  return `src/pages/${chunk.name}/index.js`;
                },
              },
            },
          },
          configFile: false,
        });
      }
      colorLog('Content code build successfully', 'success');
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [svgr({ exportAsDefault: true }), react(), makeManifest(), buildContentScript()],
  publicDir,
  build: {
    outDir,
    sourcemap: process.env.__DEV__ === 'true',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: resolve(pagesDir, 'background', 'index.ts'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html'),
        offscreen: resolve(pagesDir, 'offscreen', 'index.html'),
      },
      output: {
        entryFileNames: chunk => `src/pages/${chunk.name}/index.js`,
      },
    },
  },
});
