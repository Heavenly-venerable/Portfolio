// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: "Hariyanto Saputra | Fullstack Developer, Web engineer",
      meta: [
        { name: "description", content: "Professional portfolio of Hariyanto Saputra, a skilled Fullstack Developer specializing in modern web technologies, Vue.js, Nuxt.js, and full-stack development solutions." },
        { name: "keywords", content: "fullstack developer, web developer, Vue.js developer, Nuxt.js developer, portfolio, Hariyanto Saputra, software engineer, frontend developer, backend developer" },
        { name: "author", content: "Hariyanto Saputra" },
        { name: "creator", content: "Hariyanto Saputra" },
        { name: "publisher", content: "Hariyanto Saputra" },
        { name: "robots", content: "index, follow" },
        { name: "referrer", content: "origin-when-cross-origin" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:url", content: "https://hariyanto.vercel.app" },
        { property: "og:title", content: "Hariyanto Saputra | Fullstack Developer, Web engineer" },
        { property: "og:description", content: "Professional portfolio of Hariyanto Saputra, a skilled Fullstack Developer specializing in modern web technologies, Vue.js, Nuxt.js, and full-stack development solutions." },
        { property: "og:site:name", content: "Hariyanto Saputra Porfolio" },
      ],
      link: [
        { rel: "canonical", href: "https://hariyanto.vercel.app" },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        }
      ]
    }
  },
  lucide: {
    namePrefix: 'Icon'
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
  },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', "nuxt-lucide-icons", "@nuxtjs/color-mode"]
})
