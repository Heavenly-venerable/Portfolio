<script setup lang="ts">
import Container from "../Container.vue";
import Card from "../Card.vue"

const cardProperties = [
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
  {
    "title": "Netura",
    "description": "A school website providing essential information for students, parents, and staff. Features include announcements, event schedules, academic resources, faculty profiles, and an interactive gallery. It also supports online admissions, grade tracking, and a contact portal for seamless communication.",
    "stack": "Nuxt Mongoose Tailwindcss primevue",
    "hasUrl": true,
    "url": "https://netura.vercel.app/"
  },
]
</script>

<template>
  <Container id="projects">
    <div class="flex item-center gap-4">
      <h3 class="text-lightest-slate-dark text-2xl font-bold">
        <span class="text-green-dark text-base font-mono font-extralight"> 02. </span>
        Some Things I’ve Built
      </h3>
      <div class="flex-1 h-[1px] self-center bg-lightest-navy-dark"></div>
    </div>
    <Card v-for="card in cardProperties" :key="card.title" :title="card.title" :description="card.description"
      :stack="card.stack" :url="card.url" :hasUrl="card.hasUrl" />
  </Container>
</template>
