<script setup lang="ts">
const skills = ["Javascript (ES6+)", "Typescript", "Vue.js", "Nuxt", "Node.js", "Express.js"]
</script>

<template>
  <Container id="about">
    <div v-motion-slide-visible-once-bottom :duration="700" class="flex item-center gap-4">
      <h3 class="text-zinc-900 text-2xl font-bold dark:text-zinc-300">
        <span class="inline-block text-green-500 text-base font-mono font-extralight"> 01. </span>
        About Me
      </h3>
      <div class="flex-1 h-[1px] self-center bg-zinc-900 dark:bg-zinc-300"></div>
    </div>
    <div class="text-zinc-600 dark:text-zinc-500">
      <p v-motion-slide-visible-once-bottom :duration="700" class="mt-8">
        Hello! My name is Hariyanto Saputra, and I love building things for the web. My interest in web development
        started back
        in 2023 when I first experimented with coding—what began as a simple attempt to customize a website quickly
        turned into a passion for creating intuitive and dynamic user experiences.
      </p>
      <p v-motion-slide-visible-once-bottom :duration="700" class="mt-4">
        Since then, I’ve been deepening my skills by working on personal projects. I enjoy exploring new technologies,
        solving problems, and building applications that are both
        functional and accessible.
      </p>
      <p v-motion-slide-visible-once-bottom :duration="700" class="mt-4">
        Here are a few technologies I’ve been working with recently:
      </p>
      <ul v-motion-slide-visible-once-bottom :duration="700" class="grid grid-cols-2 px-4 mt-4 gap-2 text-sm">
        <li v-for="skill in skills" :key="skill" class="list-disc text-green-500">
          <span class="text-zinc-600 dark:text-zinc-500">
            {{ skill }}
          </span>
        </li>
      </ul>
    </div>
  </Container>
</template>

<style scoped></style>
