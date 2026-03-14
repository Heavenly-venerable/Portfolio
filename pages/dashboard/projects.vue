<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { PencilIcon, TrashIcon, StarIcon } from '@heroicons/vue/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'dashboard'
})

const { projects, fetchProjects, createProject, updateProject, deleteProject, toggleFeatured, loading } = useProjects()

const isOpen = ref(false)
const editingProject = ref<any>(null)
const formData = ref({
  title: '',
  category: '',
  status: '',
  year: '',
  description: '',
  technologies: [] as string[],
  features: [] as string[],
  hasGithub: false,
  githubUrl: '',
  hasUrl: false,
  url: '',
  isFeatured: false
})

const techInput = ref('')
const featureInput = ref('')
const successMessage = ref('')
const errorMessage = ref('')

onMounted(() => {
  fetchProjects()
})

const openModal = (project?: any) => {
  if (project) {
    editingProject.value = project
    formData.value = { ...project }
  } else {
    editingProject.value = null
    formData.value = {
      title: '',
      category: '',
      status: '',
      year: new Date().getFullYear().toString(),
      description: '',
      technologies: [],
      features: [],
      hasGithub: false,
      githubUrl: '',
      hasUrl: false,
      url: '',
      isFeatured: false
    }
  }
  isOpen.value = true
}

const addTechnology = () => {
  if (techInput.value && !formData.value.technologies.includes(techInput.value)) {
    formData.value.technologies.push(techInput.value)
    techInput.value = ''
  }
}

const removeTechnology = (index: number) => {
  formData.value.technologies.splice(index, 1)
}

const addFeature = () => {
  if (featureInput.value && !formData.value.features.includes(featureInput.value)) {
    formData.value.features.push(featureInput.value)
    featureInput.value = ''
  }
}

const removeFeature = (index: number) => {
  formData.value.features.splice(index, 1)
}

const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  let result
  if (editingProject.value) {
    result = await updateProject(editingProject.value.id, formData.value)
  } else {
    result = await createProject(formData.value)
  }

  if (result) {
    successMessage.value = editingProject.value ? 'Project updated successfully!' : 'Project created successfully!'
    isOpen.value = false
    await fetchProjects()
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } else {
    errorMessage.value = 'Failed to save project'
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this project?')) {
    const success = await deleteProject(id)
    if (success) {
      successMessage.value = 'Project deleted successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  }
}

const handleToggleFeatured = async (id: number) => {
  await toggleFeatured(id)
}
</script>

<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Projects</h1>
        <p class="text-zinc-600 dark:text-zinc-400">Manage your portfolio projects</p>
      </div>
      <button @click="openModal()"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        Add New Project
      </button>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage"
      class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 dark:bg-green-900 dark:border-green-800 dark:text-green-300">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage"
      class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-300">
      {{ errorMessage }}
    </div>

    <!-- Projects List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-800">
      <div v-if="loading" class="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Loading...
      </div>

      <div v-else-if="!projects.length" class="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        No projects yet. Click "Add New Project" to create one.
      </div>

      <ul v-else role="list" class="divide-y divide-zinc-200 dark:divide-zinc-700">
        <li v-for="project in projects" :key="project.id" class="p-4 sm:px-6">
          <!-- Mobile: Stack layout -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <p class="text-sm font-medium text-green-600 truncate dark:text-green-500">{{ project.title }}</p>
                <button @click="handleToggleFeatured(project.id)" class="flex-shrink-0 focus:outline-none">
                  <StarIconSolid v-if="project.isFeatured" class="h-5 w-5 text-yellow-500" />
                  <StarIcon v-else class="h-5 w-5 text-zinc-400 hover:text-yellow-500" />
                </button>
              </div>

              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {{ project.category }}
                </span>
                <span
                  class="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300">
                  {{ project.year }}
                </span>
              </div>

              <p class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{{ project.description }}</p>
            </div>

            <!-- Action Buttons - Full width on mobile -->
            <div class="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
              <button @click="openModal(project)"
                class="flex-1 sm:flex-none px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20">
                Edit
              </button>
              <button @click="handleDelete(project.id)"
                class="flex-1 sm:flex-none px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Project Modal -->
    <Dialog :open="isOpen" @close="isOpen = false" class="relative z-50">
      <div class="fixed inset-0 bg-zinc-900/80" aria-hidden="true" />

      <div class="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <DialogPanel
          class="w-full max-h-[90vh] overflow-y-auto bg-white rounded-t-xl sm:rounded-lg shadow-xl dark:bg-zinc-800">
          <!-- Modal Header - Sticky on mobile -->
          <div class="sticky top-0 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-4 sm:p-6">
            <DialogTitle class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {{ editingProject ? 'Edit Project' : 'Add New Project' }}
            </DialogTitle>
          </div>

          <!-- Modal Body -->
          <div class="p-4 sm:p-6">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Basic Info - Stack on mobile -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
                  <input v-model="formData.title" type="text" required
                    class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                    placeholder="Project title" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
                  <input v-model="formData.category" type="text" required
                    class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                    placeholder="e.g., Full Stack Development" />
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Status</label>
                    <input v-model="formData.status" type="text" required
                      class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                      placeholder="Status" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Year</label>
                    <input v-model="formData.year" type="text" required
                      class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                      placeholder="2025" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
                  <textarea v-model="formData.description" rows="4" required
                    class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                    placeholder="Describe your project..."></textarea>
                </div>
              </div>

              <!-- Technologies - Mobile friendly -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Technologies</label>
                <div class="flex flex-col sm:flex-row gap-2 mb-2">
                  <input v-model="techInput" type="text" placeholder="Add technology"
                    class="flex-1 px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                    @keyup.enter="addTechnology" />
                  <button type="button" @click="addTechnology"
                    class="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                    Add
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(tech, index) in formData.technologies" :key="index"
                    class="px-2 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs flex items-center gap-1 dark:bg-zinc-700 dark:text-zinc-300">
                    {{ tech }}
                    <button type="button" @click="removeTechnology(index)"
                      class="text-red-500 hover:text-red-700 text-lg leading-none">
                      ×
                    </button>
                  </span>
                </div>
              </div>

              <!-- Features - Mobile friendly -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Features</label>
                <div class="flex flex-col sm:flex-row gap-2 mb-2">
                  <input v-model="featureInput" type="text" placeholder="Add feature"
                    class="flex-1 px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                    @keyup.enter="addFeature" />
                  <button type="button" @click="addFeature"
                    class="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                    Add
                  </button>
                </div>
                <div class="space-y-1">
                  <div v-for="(feature, index) in formData.features" :key="index"
                    class="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span class="text-green-500 mt-1">•</span>
                    <span class="flex-1">{{ feature }}</span>
                    <button type="button" @click="removeFeature(index)"
                      class="text-red-500 hover:text-red-700 text-lg leading-none">
                      ×
                    </button>
                  </div>
                </div>
              </div>

              <!-- Links - Stack on mobile -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <input type="checkbox" v-model="formData.hasGithub" id="hasGithub"
                    class="w-4 h-4 rounded border-zinc-300 text-green-500 focus:ring-green-500" />
                  <label for="hasGithub" class="text-sm text-zinc-700 dark:text-zinc-300">Has GitHub Repository</label>
                </div>

                <div v-if="formData.hasGithub">
                  <input v-model="formData.githubUrl" type="url" placeholder="GitHub URL"
                    class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" v-model="formData.hasUrl" id="hasUrl"
                    class="w-4 h-4 rounded border-zinc-300 text-green-500 focus:ring-green-500" />
                  <label for="hasUrl" class="text-sm text-zinc-700 dark:text-zinc-300">Has Live URL</label>
                </div>

                <div v-if="formData.hasUrl">
                  <input v-model="formData.url" type="url" placeholder="Live URL"
                    class="w-full px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                </div>
              </div>

              <!-- Modal Footer - Sticky on mobile -->
              <div
                class="sticky bottom-0 bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 -m-4 sm:-m-6 mt-4 p-4 sm:p-6">
                <div class="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                  <button type="button" @click="isOpen = false"
                    class="w-full sm:w-auto px-4 py-3 sm:py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 text-sm">
                    Cancel
                  </button>
                  <button type="submit" :disabled="loading"
                    class="w-full sm:w-auto px-4 py-3 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm">
                    {{ loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project') }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>
