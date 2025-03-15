<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isHidden = ref(false)
const isMenuOpen = ref(false)
let lastScrollTop = 0

const handleScroll = () => {
  const currentScroll = window.scrollY
  isHidden.value = currentScroll > lastScrollTop && currentScroll > 50
  lastScrollTop = currentScroll
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header id="navbar" :class="[
    'fixed top-0 left-0 w-full bg-navy-dark shadow-md transition-transform duration-300 z-50',
    isHidden ? '-translate-y-full' : 'translate-y-0'
  ]">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <h1 class="text-green-dark text-xl font-bold">Hariyanto Saputra</h1>
      <button class="text-green-dark md:hidden" @click="toggleMenu">
        <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <ul class="hidden text-gren-dark md:flex space-x-4">
        <li><a href="#" class="">Home</a></li>
        <li><a href="#" class="">About</a></li>
        <li><a href="#" class="">Contact</a></li>
      </ul>
    </nav>
    <transition name="mobile-menu">
      <div id="mobileMenu" v-if="isMenuOpen"
        class="absolute w-full bg-navy-dark text-green-dark shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
        <a href="#about" class="flex flex-col items-center text-lightest-slate-dark" @click="closeMenu"><span
            class="text-green-dark">01.</span>About</a>
        <a href="#projects" class="flex flex-col items-center text-lightest-slate-dark" @click="closeMenu"><span
            class="text-green-dark">02.</span>Projects</a>
        <a href="#contact" class="flex flex-col items-center text-lightest-slate-dark" @click="closeMenu"><span
            class="text-green-dark">03.</span>Contact</a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
header {
  will-change: transform;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
