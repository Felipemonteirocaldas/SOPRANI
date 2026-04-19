// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // 'server' permite SSR (Server Side Rendering), necessário se você for usar 
  // funções de backend ou o adapter da Vercel de forma dinâmica.
  output: "server",

  // Configuração do Adapter para Deploy na Vercel
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  integrations: [
    tailwind(),
    react(), // React limpo, sem os plugins de inspeção da Wix
  ],

  vite: {
    // Limpeza de cache e otimização de dependências padrão
    cacheDir: 'node_modules/.cache/.vite',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client', // Adicione esta linha
        'react-router-dom',  // Adicione esta linha
        'zustand',
        'framer-motion',
        'date-fns',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
        'zod',
        'sanity',
        'sanity/structure',
        '@sanity/vision',
      ],
    },
  },

  image: {
    // Mantemos o domínio da Wix aqui para que as imagens que já estão 
    // cadastradas continuem carregando enquanto você não as migra.
    domains: ["static.wixstatic.com"],
  },

  // Configurações de servidor para desenvolvimento local
  server: {
    port: 3333,
    host: true,
    allowedHosts: true,
  },

  // Desabilita a barra de ferramentas do Astro para um preview mais limpo
  devToolbar: {
    enabled: false,
  },
});