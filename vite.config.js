import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // …
  plugins: [
    // …
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),
  ],
});