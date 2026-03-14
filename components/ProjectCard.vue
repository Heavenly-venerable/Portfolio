<!-- components/ProjectCard.vue -->
<script setup lang="ts">
defineProps<{
  project: {
    title: string
    category: string
    status: string
    year: string
    description: string
    technologies: string[]
    features: string[]
    hasGithub?: boolean
    githubUrl?: string
    hasUrl?: boolean
    url?: string
    isFeatured?: boolean
  }
}>()
</script>

<template>
  <div
    class="bg-white shadow-md border border-zinc-300 rounded-lg overflow-hidden dark:bg-zinc-800 dark:border-zinc-700"
    :class="{ 'md:col-span-2': project.isFeatured }">
    <!-- Project Header with Status -->
    <div class="p-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span class="text-green-600 text-xs font-mono font-extralight uppercase tracking-wider dark:text-green-500">
            {{ project.category }}
          </span>
          <h3 class="mt-1 text-zinc-900 text-xl font-bold hover:text-green-500 transition-colors dark:text-zinc-100">
            {{ project.title }}
          </h3>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span
            class="px-3 py-1 bg-green-100 text-green-700 rounded-full font-mono text-xs dark:bg-green-900 dark:text-green-300">
            {{ project.status }}
          </span>
          <span class="text-zinc-500 font-mono text-xs dark:text-zinc-400">
            {{ project.year }}
          </span>
        </div>
      </div>
    </div>

    <!-- Project Description -->
    <div class="p-6">
      <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {{ project.description }}
      </p>
    </div>

    <!-- Technologies Used -->
    <div class="px-6 pb-2">
      <h4 class="text-sm font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        Technologies Used
      </h4>
      <div class="flex flex-wrap gap-2">
        <span v-for="tech in project.technologies" :key="tech"
          class="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-mono rounded-md dark:bg-zinc-700 dark:text-zinc-300">
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Key Features -->
    <div class="px-6 py-4">
      <h4 class="text-sm font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        Key Features
      </h4>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <li v-for="feature in project.features" :key="feature"
          class="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span class="text-green-500 mt-1">•</span>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>

    <!-- Project Links -->
    <div
      class="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex items-center gap-x-4 dark:bg-zinc-700/30 dark:border-zinc-700">
      <a v-if="project.hasGithub" :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
        class="text-zinc-600 hover:text-green-500 transition-colors dark:text-zinc-400"
        aria-label="View source code on GitHub">
        <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      </a>
      <a v-if="project.hasUrl" :href="project.url" target="_blank" rel="noopener noreferrer"
        class="text-zinc-600 hover:text-green-500 transition-colors dark:text-zinc-400" aria-label="View live project">
        <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
        </svg>
      </a>
    </div>
  </div>
</template>
