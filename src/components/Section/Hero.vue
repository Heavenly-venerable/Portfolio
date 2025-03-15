<script setup lang="ts">
import Button from "../Button.vue"
import Container from "../Container.vue"
</script>

<template>
  <Container>
    <span class="text-green-dark text-md font-mono font-extralight">Hi, my name is</span>
    <h1 class="text-lightest-slate-dark text-4xl font-bold">
      Hariyanto Saputra.
    </h1>
    <h2 class="mt-2 text-slate-dark text-4xl font-bold">
      This is where my ideas live.
    </h2>
    <p class="mt-4 text-slate-dark">
      <span class="text-green-dark">I’m a software engineer </span>passionate
      about crafting innovative and meaningful digital experiences. This is
      where my ideas live—where creativity meets code to build intuitive,
      human-centered solutions that make an impact. I thrive on solving
      complex problems, designing seamless interactions, and pushing the
      boundaries of what’s possible in the digital space.
    </p>
    <Button>Say Hello</Button>
  </Container>
</template>

<style scoped></style>
