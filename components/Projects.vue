<script setup lang="ts">
interface Project {
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

const projects: Project[] = [
  {
    title: "Netura",
    category: "Full Stack Development",
    status: "Academic Project",
    year: "2024 - 2026",
    description:
      "A school website providing essential information for students, parents, and staff. Includes announcements, event schedules, academic resources, faculty profiles, and interactive gallery.",
    technologies: ["Nuxt", "Drizzle", "Neon Serverless", "Tailwind CSS", "PrimeVue"],
    features: [
      "Landing page with school introduction",
      "Welcome section from the school",
      "School profile and information",
      "PPDB (student admission) information page",
      "Academic programs overview",
      "Facilities showcase",
      "Photo gallery",
      "Blog or news updates",
      "Contact information and communication section"
    ],
    hasUrl: true,
    url: "https://netura.vercel.app/"
  },
  {
    title: "RTHblog",
    category: "Full Stack Development",
    status: "Personal Project",
    year: "2024 -2026",
    description:
      "A personal blog platform where articles are managed through GitHub Issues using the GitHub API. Each issue acts as a blog post, allowing content management directly from GitHub while the website fetches and displays the posts dynamically.",
    technologies: ["Nuxt", "GitHub API", "Drizzle", "Neon Serverless", "Tailwind CSS"],
    features: [
      "Blog posts powered by GitHub Issues",
      "Automatic content fetching using GitHub API",
      "Markdown-based article rendering",
      "Category or label-based filtering from GitHub",
      "Responsive blog interface"
    ],
    hasUrl: true,
    url: "https://rt-hblog.vercel.app/"
  },
  {
    title: "SliceUI",
    category: "Frontend Development",
    status: "Learning Project",
    year: "2025-2026",
    description:
      "A website that contains a collection of slice UI exercises including various components, web pages, and interface elements as a medium for design exploration and UI/UX skill development.",
    technologies: ["Nuxt", "Tailwind CSS", "VueUse"],
    features: [
      "Collection of UI component slices",
      "Practice layouts and page structures",
      "UI/UX experimentation",
      "Reusable UI components"
    ],
    hasUrl: true,
    url: "https://slice-ui-hv.vercel.app/"
  },
  {
    title: "SahazNetwork",
    category: "Frontend Development",
    status: "Client Project",
    year: "2023-2026",
    description:
      "A landing page for a WiFi provider designed to showcase internet plans and attract new customers. View available packages, pricing, and service coverage areas. Sign up easily through a quick registration form and explore customer testimonials for added credibility.",
    technologies: ["Vue", "Tailwind CSS", "AOS"],
    features: [
      "Landing page for WiFi provider services",
      "Internet packages and pricing showcase",
      "Service coverage information",
      "Customer testimonials section"
    ],
    hasUrl: true,
    url: "https://sahaz-network.vercel.app/",
    isFeatured: true
  },
]
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

    <!-- Projects Grid -->
    <div class="mt-8 space-y-12">
      <MotionGroup preset="slideVisibleOnceBottom" :duration="700">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </MotionGroup>
    </div>
  </Container>
</template>
