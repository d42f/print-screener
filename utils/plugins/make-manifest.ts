import fs from 'fs';
import { resolve } from 'path';
import { colorLog } from '../log';
import manifest from '../../src/manifest';
import { PluginOption } from 'vite';

const outDir = resolve(__dirname, '..', '..', 'public');

export const makeManifest = (): PluginOption => {
  return {
    name: 'make-manifest',
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      const manifestPath = resolve(outDir, 'manifest.json');

      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

      colorLog(`Manifest file copy complete: ${manifestPath}`, 'success');
    },
  };
};
