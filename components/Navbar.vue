<script setup lang="ts">
const colorMode = useColorMode()
const { scrollTo } = useScrollTo()
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
    'fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-300 z-50 md:px-16 dark:bg-slate-900',
    isHidden ? '-translate-y-full' : 'translate-y-0'
  ]">
    <nav class="py-4 px-6 flex justify-between items-center md:p-6">
      <h1 class="text-green-500 text-3xl font-bold">Portfolio</h1>
      <div class="flex gap-6">
        <button @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'"
          class="text-neutral-600">
          <IconSun v-if="colorMode.preference === 'dark'" />
          <IconMoon v-else />
        </button>
        <button class="text-green-500 md:hidden dark:text-red-500" @click="toggleMenu">
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <ul class="hidden text-green-500 font-mono md:flex space-x-4">
          <li><a @click.prevent="scrollTo('about')" href="#about" class="text-neutral-900"><span
                class="text-green-500">01. </span>About</a></li>
          <li><a @click.prevent="scrollTo('projects')" href="#projects" class="text-neutral-900"><span
                class="text-green-500">02. </span>Projects</a>
          </li>
          <li><a @click.prevent="scrollTo('contact')" href="#contact" class="text-neutral-900"><span
                class="text-green-500">03. </span>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
    <transition name="mobile-menu">
      <div id="mobileMenu" v-if="isMenuOpen"
        class="absolute w-full bg-white text-green-500 font-mono shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
        <a @click.prevent="scrollTo('about')" href="#about" class="flex flex-col items-center text-neutral-900"
          @click="closeMenu"><span class="text-green-500">01.</span>About</a>
        <a @click.prevent="scrollTo('projects')" href="#projects" class="flex flex-col items-center text-neutral-900"
          @click="closeMenu"><span class="text-green-500">02.</span>Projects</a>
        <a @click.prevent="scrollTo('contact')" href="#contact" class="flex flex-col items-center text-neutral-900"
          @click="closeMenu"><span class="text-green-500">03.</span>Contact</a>
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
