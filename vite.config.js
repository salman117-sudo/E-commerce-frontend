import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],

 resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@layout": path.resolve(__dirname, "./src/layout"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@sections": path.resolve(__dirname, "./src/components/sections/homePage"),
    "@productPage": path.resolve(__dirname, "./src/components/sections/productPage"),
    "@categoryPage": path.resolve(__dirname, "./src/components/sections/categoryPage"),
    "@cartPage": path.resolve(__dirname, "./src/components/sections/cartPage"),
    "@checkoutPage": path.resolve(__dirname, "./src/components/sections/checkoutPage"),
    "@store": path.resolve(__dirname, "./src/store"),
    "@data": path.resolve(__dirname, "./src/data"),
  },
},
})
