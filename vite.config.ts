import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // SWC version of React plugin

export default defineConfig({
  plugins: [react()],
});

