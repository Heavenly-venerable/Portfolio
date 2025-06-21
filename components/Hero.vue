<script setup lang="ts">
</script>

<template>
  <Container>
    <span v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="700"
      class="px-4 py-1 mb-2 inline-block bg-green-100 text-green-600 text-md font-mono font-extralight rounded-full dark:bg-green-200 dark:text-green-600">Hi,
      my
      name
      is</span>
    <h1 v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="700" :delay="200"
      class="text-zinc-900 text-4xl font-bold dark:text-zinc-100">
      Hariyanto Saputra.
    </h1>
    <h2 v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="700" :delay="300"
      class="text-zinc-800 text-4xl font-bold dark:text-zinc-300">
      This is where my ideas live.
    </h2>
    <p v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="700" :delay="400"
      class="mt-4 text-zinc-600 dark:text-zinc-500">
      <span class="text-green-500">I’m a software engineer </span>passionate
      about crafting innovative and meaningful digital experiences. This is
      where my ideas live—where creativity meets code to build intuitive,
      human-centered solutions that make an impact. I thrive on solving
      complex problems, designing seamless interactions, and pushing the
      boundaries of what’s possible in the digital space.
    </p>
    <Button v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="700" :delay="500">
      <a href="mailto:heavenlyvenerable66@gmail.com">Say Hello</a>
    </Button>
  </Container>
</template>

<style scoped></style>
