<script setup lang="ts">
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'

const { loggedIn, user, clear } = useUserSession()
const router = useRouter()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: BriefcaseIcon },
  { name: 'Messages', href: '/dashboard/messages', icon: EnvelopeIcon },
]

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await router.push('/login')
}

// Redirect if not logged in (middleware will also handle this)
if (!loggedIn.value) {
  await router.push('/login')
}
</script>

<template>
  <div v-if="loggedIn" class="min-h-screen bg-zinc-50 dark:bg-zinc-900">
    <!-- Mobile sidebar -->
    <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false" :open="sidebarOpen">
      <div class="fixed inset-0 bg-zinc-900/80" />
      <div class="fixed inset-0 flex">
        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
              <span class="sr-only">Close sidebar</span>
              <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <!-- Mobile sidebar content -->
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 dark:bg-zinc-800">
            <div class="flex h-16 shrink-0 items-center">
              <h1 class="text-green-500 text-2xl font-bold">Portfolio CMS</h1>
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li v-for="item in navigation" :key="item.name">
                      <NuxtLink :to="item.href" @click="sidebarOpen = false"
                        class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold" :class="[
                          $route.path === item.href
                            ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300'
                            : 'text-zinc-700 hover:text-green-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-700'
                        ]">
                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                        {{ item.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-200 bg-white px-6 pb-4 dark:border-zinc-700 dark:bg-zinc-800">
        <div class="flex h-16 shrink-0 items-center">
          <h1 class="text-green-500 text-2xl font-bold">Portfolio CMS</h1>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    :class="[
                      $route.path === item.href
                        ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300'
                        : 'text-zinc-700 hover:text-green-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    ]">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-72">
      <!-- Top bar -->
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:bg-zinc-800 dark:border-zinc-700">
        <button type="button" class="-m-2.5 p-2.5 text-zinc-700 lg:hidden dark:text-zinc-300"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-zinc-200 lg:hidden dark:bg-zinc-700" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- User info -->
            <span class="hidden sm:inline text-sm text-zinc-700 dark:text-zinc-300">
              {{ user?.name || 'Admin' }}
            </span>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <div
                  class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                  {{ user?.name?.charAt(0) || 'A' }}
                </div>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none dark:bg-zinc-800">
                  <MenuItem v-slot="{ active }">
                  <NuxtLink to="/dashboard/profile"
                    :class="[active ? 'bg-zinc-50 dark:bg-zinc-700' : '', 'block px-3 py-1 text-sm leading-6 text-zinc-900 dark:text-zinc-100']">
                    Your Profile
                  </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a href="/" target="_blank"
                    :class="[active ? 'bg-zinc-50 dark:bg-zinc-700' : '', 'block px-3 py-1 text-sm leading-6 text-zinc-900 dark:text-zinc-100']">
                    View Site
                  </a>
                  </MenuItem>
                  <div class="my-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                  <MenuItem v-slot="{ active }">
                  <button @click="handleLogout"
                    :class="[active ? 'bg-zinc-50 dark:bg-zinc-700' : '', 'block w-full text-left px-3 py-1 text-sm leading-6 text-red-600 dark:text-red-400']">
                    <div class="flex items-center gap-2">
                      <ArrowRightOnRectangleIcon class="h-4 w-4" />
                      Sign out
                    </div>
                  </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
