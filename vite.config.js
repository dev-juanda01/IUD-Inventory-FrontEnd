import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "IUD Inventory",
        short_name: "IUDI",
        description:
          "Bienvenid@ al inventario de la IU Digital de Antioquia. Almacena diversos tipos de productos de manera sencilla y rapida",
        background_color: "#dcdcdc",
        theme_color: "#203f58",
        lang: "es",
        icons: [
          {
            src: "/icons/180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/icons/256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
