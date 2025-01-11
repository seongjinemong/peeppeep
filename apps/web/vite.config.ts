import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  envDir: '../../',
  plugins: [svgr(), react(), tsconfigPaths()],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'ESLINT_ERROR') return; // ESLint 오류 무시
        warn(warning);
      },
    },
  }
})
