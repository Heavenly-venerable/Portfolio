<script setup lang="ts">
const cardProperties = [
  {
    "title": "SliceUI",
    "description": "A website that contains a collection of slice UI exercises that I have worked on, including various components, web pages, and other interface elements as a medium for design exploration and skill development in the UI/UX field.",
    "stack": "Nuxt Tailwindcss VueUse",
    "hasUrl": true,
    "url": "https://slice-ui-hv.vercel.app/"
  },
  {
    "title": "Netura",
    "description": "A school website providing essential information for students, parents, and staff. Features include announcements, event schedules, academic resources, faculty profiles, and an interactive gallery. It also supports online admissions, grade tracking, and a contact portal for seamless communication.",
    "stack": "Nuxt Mongoose Tailwindcss primevue",
    "hasUrl": true,
    "url": "https://netura.vercel.app/"
  },
  {
    "title": "SahazNetwork",
    "description": "A landing page for a WiFi provider designed to showcase internet plans and attract new customers. View available packages, pricing, and service coverage areas. Sign up easily through a quick registration form and explore customer testimonials for added credibility.",
    "stack": "Vue Tailwindcss AOS",
    "hasUrl": true,
    "url": "https://sahaz-network.vercel.app/"
  },
  {
    "title": "RTHblog",
    "description": "A personal blog platform designed for sharing articles, insights, and stories on various topics. Browse categorized posts, read featured content, and engage through comments.",
    "stack": "Nuxt Mongoose Tailwindcss ",
    "hasUrl": true,
    "url": "https://rt-hblog.vercel.app/"
  },
]
</script>

<template>
  <Container id="projects">
    <div v-motion-slide-visible-once-bottom :duration="700" class="flex item-center gap-4">
      <h3 class="text-neutral-900 text-2xl font-bold">
        <span class="inline-block text-green-500 text-base font-mono font-extralight"> 02. </span>
        Some Things I’ve Built
      </h3>
      <div class="flex-1 h-[1px] self-center bg-neutral-900"></div>
    </div>
    <MotionGroup preset="slideVisibleOnceBottom" :duration="700">
      <Card v-for="card in cardProperties" :key="card.title" :title="card.title" :description="card.description"
        :stack="card.stack" :url="card.url" :hasUrl="card.hasUrl" />
    </MotionGroup>
  </Container>
</template>
