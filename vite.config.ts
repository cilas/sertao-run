import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(dirname, 'src/assets/**/*'),
          dest: 'assets'
        }
      ]
    })
  ],
  build: {
    assetsInlineLimit: 4096
  }
});
