<script setup lang="ts">
const { projects, featuredProjects, fetchProjects, fetchFeaturedProjects, loading } = useProjects();

onMounted(() => {
  fetchProjects();
  fetchFeaturedProjects();
});

// Combine all projects with featured first
const allProjects = computed(() => {
  const featured = featuredProjects.value;
  const nonFeatured = projects.value.filter(p => !p.isFeatured);
  return [...featured, ...nonFeatured];
});
</script>

<template>
  <Container id="projects">
    <!-- Section Header -->
    <div v-motion-slide-visible-once-bottom :duration="700" class="flex items-center gap-4">
      <h3 class="text-zinc-900 text-2xl font-bold dark:text-zinc-300">
        <span class="inline-block text-green-500 text-base font-mono font-extralight">02.</span>
        Some Things I've Built
      </h3>
      <div class="flex-1 h-[1px] self-center bg-zinc-900 dark:bg-zinc-300"></div>
    </div>

    <div v-if="loading" class="mt-8 text-center text-zinc-600 dark:text-zinc-400">
      Loading projects...
    </div>

    <!-- Projects Grid -->
    <div v-else class="mt-8 space-y-6">
      <MotionGroup preset="slideVisibleOnceBottom" :duration="700">
        <ProjectCard v-for="project in allProjects" :key="project.id" :project="project" />
      </MotionGroup>
    </div>
  </Container>
</template>
