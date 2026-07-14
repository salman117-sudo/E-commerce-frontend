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
    "@sections": path.resolve(__dirname, "./src/components/sections/homePageSections"),
    "@productPage": path.resolve(__dirname, "./src/components/sections/productPageSections"),
    "@categoryPage": path.resolve(__dirname, "./src/components/sections/categoryPageSections"),
    "@cartPage": path.resolve(__dirname, "./src/components/sections/cartPageSections"),
    "@checkoutPage": path.resolve(__dirname, "./src/components/sections/checkoutPageSections"),
    "@authPage": path.resolve(__dirname, "./src/components/sections/authPageSections"),
    "@store": path.resolve(__dirname, "./src/store"),
    "@data": path.resolve(__dirname, "./src/data"),
  },
},
})
