<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const { projects, fetchProjects } = useProjects()
const { skills, fetchSkills } = useSkills()
const { messages, fetchMessages } = useMessages()
const { profile, fetchProfile } = useProfile()

const stats = ref([
  { name: 'Total Projects', value: 0, icon: 'BriefcaseIcon', color: 'bg-blue-500' },
  { name: 'Skills', value: 0, icon: 'AcademicCapIcon', color: 'bg-green-500' },
  { name: 'Unread Messages', value: 0, icon: 'EnvelopeIcon', color: 'bg-yellow-500' },
  { name: 'Featured Projects', value: 0, icon: 'StarIcon', color: 'bg-purple-500' },
])

onMounted(async () => {
  await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchMessages(),
    fetchProfile()
  ])

  stats.value = [
    { ...stats.value[0], value: projects.value.length },
    { ...stats.value[1], value: skills.value.length },
    { ...stats.value[2], value: messages.value.filter(m => !m.isRead).length },
    { ...stats.value[3], value: projects.value.filter(p => p.isFeatured).length },
  ]
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard Overview</h1>
      <p class="text-zinc-600 dark:text-zinc-400">Welcome back, {{ profile?.name || 'Admin' }}!</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg dark:bg-zinc-800">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div :class="[stat.color, 'rounded-md p-3']">
                <component :is="stat.icon" class="h-6 w-6 text-white" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-zinc-500 truncate dark:text-zinc-400">{{ stat.name }}</dt>
                <dd class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{{ stat.value }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Projects</h2>
        <NuxtLink to="/dashboard/projects" class="text-sm text-green-600 hover:text-green-700 dark:text-green-500">
          View all →
        </NuxtLink>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-800">
        <ul role="list" class="divide-y divide-zinc-200 dark:divide-zinc-700">
          <li v-for="project in projects.slice(0, 5)" :key="project.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <p class="text-sm font-medium text-green-600 truncate dark:text-green-500">{{ project.title }}</p>
                <span v-if="project.isFeatured"
                  class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Featured
                </span>
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ project.year }}</p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                  {{ project.category }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Recent Messages -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Messages</h2>
        <NuxtLink to="/dashboard/messages" class="text-sm text-green-600 hover:text-green-700 dark:text-green-500">
          View all →
        </NuxtLink>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-800">
        <ul role="list" class="divide-y divide-zinc-200 dark:divide-zinc-700">
          <li v-for="message in messages.slice(0, 3)" :key="message.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <p class="text-sm font-medium text-green-600 dark:text-green-500">{{ message.name }}</p>
                <span v-if="!message.isRead"
                  class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  New
                </span>
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ new Date(message.createdAt).toLocaleDateString()
                  }}</p>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-sm text-zinc-600 dark:text-zinc-300">{{ message.message.substring(0, 100) }}...</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
