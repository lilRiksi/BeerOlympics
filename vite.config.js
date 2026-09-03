import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        tickets: 'tickets.html',
        tshirts: 't-shirts.html',
        halloffame: 'halloffame.html',
        gallery: 'gallery.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
