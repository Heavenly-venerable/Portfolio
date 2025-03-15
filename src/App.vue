<script setup lang="ts">
import Hero from "./components/Section/Hero.vue";
import About from "./components/Section/About.vue";
import Projects from "./components/Section/Projects.vue";
import Contact from "./components/Section/Contact.vue"
import Footer from "./components/Section/Footer.vue"
import Navbar from "./components/Section/Navbar.vue"
</script>

<template>
  <Navbar />
  <div class="w-full h-full bg-navy-dark md:px-16">
    <div class="pt-16">
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
