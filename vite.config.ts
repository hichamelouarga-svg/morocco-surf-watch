import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and related libraries
          react: ['react', 'react-dom', 'react-router-dom'],
          // Split UI libraries
          ui: ['@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          // Split query and state management
          query: ['@tanstack/react-query'],
          // Split mapping libraries
          maps: ['mapbox-gl', '@googlemaps/js-api-loader'],
          // Split large utility libraries
          utils: ['clsx', 'class-variance-authority', 'tailwind-merge', 'date-fns'],
          // Split chart and visualization
          charts: ['recharts', 'embla-carousel-react'],
          // Split form libraries
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Split Supabase
          supabase: ['@supabase/supabase-js'],
          // Split internationalization
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
