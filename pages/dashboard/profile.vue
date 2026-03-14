<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

definePageMeta({
  layout: 'dashboard'
})

const { profile, fetchProfile, updateProfile, loading } = useProfile()
const { skills, fetchSkills, createSkill, updateSkill, deleteSkill, loading: skillsLoading } = useSkills()

const formData = ref({
  name: '',
  title: '',
  subtitle: '',
  bio: '',
  email: '',
  github: '',
  instagram: '',
  linkedin: ''
})

const newSkill = ref({
  name: '',
  category: 'frontend' as 'frontend' | 'backend' | 'tools'
})

const editSkill = ref<{
  id: number
  name: string
  category: string
} | null>(null)

const categories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'tools', name: 'Tools' }
]

const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  await Promise.all([
    fetchProfile(),
    fetchSkills()
  ])

  if (profile.value) {
    formData.value = { ...profile.value }
  }
})

const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  const success = await updateProfile(formData.value)

  if (success) {
    successMessage.value = 'Profile updated successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } else {
    errorMessage.value = 'Failed to update profile'
  }
}

const handleAddSkill = async () => {
  if (!newSkill.value.name) return

  const result = await createSkill({
    name: newSkill.value.name,
    category: newSkill.value.category,
    order: skills.value.length + 1
  })

  if (result) {
    newSkill.value.name = ''
    successMessage.value = 'Skill added successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}

const handleUpdateSkill = async () => {
  if (!editSkill.value) return

  const result = await updateSkill(editSkill.value.id, {
    name: editSkill.value.name,
    category: editSkill.value.category as any
  })

  if (result) {
    editSkill.value = null
    successMessage.value = 'Skill updated successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}

const handleDeleteSkill = async (id: number) => {
  if (confirm('Are you sure you want to delete this skill?')) {
    const success = await deleteSkill(id)
    if (success) {
      successMessage.value = 'Skill deleted successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  }
}
</script>

<template>
  <div>
    <div class="mb-6 md:mb-8">
      <h1 class="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">Profile Settings</h1>
      <p class="text-sm md:text-base text-zinc-600 dark:text-zinc-400">Manage your profile information and skills</p>
    </div>

    <!-- Success/Error Messages - Mobile Friendly -->
    <div v-if="successMessage" class="mb-4 p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg text-sm md:text-base text-green-700 dark:bg-green-900 dark:border-green-800 dark:text-green-300">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mb-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-sm md:text-base text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-300">
      {{ errorMessage }}
    </div>

    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800 overflow-x-auto">
        <Tab v-slot="{ selected }" as="template">
          <button :class="[
            'w-full rounded-lg py-2 px-3 text-xs sm:text-sm font-medium leading-5 whitespace-nowrap',
            'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
            selected
              ? 'bg-white text-green-700 shadow dark:bg-zinc-700 dark:text-green-300'
              : 'text-zinc-600 hover:bg-white/[0.12] hover:text-green-600 dark:text-zinc-400'
          ]">
            Profile Info
          </button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <button :class="[
            'w-full rounded-lg py-2 px-3 text-xs sm:text-sm font-medium leading-5 whitespace-nowrap',
            'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
            selected
              ? 'bg-white text-green-700 shadow dark:bg-zinc-700 dark:text-green-300'
              : 'text-zinc-600 hover:bg-white/[0.12] hover:text-green-600 dark:text-zinc-400'
          ]">
            Skills Management
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-4">
        <!-- Profile Info Panel - Mobile First -->
        <TabPanel>
          <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow dark:bg-zinc-800">
            <div class="space-y-4">
              <!-- Name - Full width on mobile -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="Your name"
                />
              </div>
              
              <!-- Email - Full width on mobile -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="your@email.com"
                />
              </div>

              <!-- Title - Full width on mobile -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <!-- Subtitle - Full width on mobile -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Subtitle</label>
                <input
                  v-model="formData.subtitle"
                  type="text"
                  required
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="Your tagline"
                />
              </div>

              <!-- Bio - Full width on mobile -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Bio</label>
                <textarea
                  v-model="formData.bio"
                  rows="4"
                  required
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="Tell your story..."
                ></textarea>
              </div>

              <!-- Social Links - Stack on mobile -->
              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">GitHub URL</label>
                <input
                  v-model="formData.github"
                  type="url"
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Instagram URL</label>
                <input
                  v-model="formData.instagram"
                  type="url"
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">LinkedIn URL</label>
                <input
                  v-model="formData.linkedin"
                  type="url"
                  class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <!-- Submit Button - Full width on mobile -->
            <div class="mt-6">
              <button
                type="submit"
                :disabled="loading"
                class="w-full sm:w-auto px-6 py-3 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </TabPanel>

        <!-- Skills Management Panel - Mobile First -->
        <TabPanel>
          <div class="bg-white p-4 md:p-6 rounded-lg shadow dark:bg-zinc-800">
            <!-- Add Skill Form - Stack on mobile -->
            <div class="mb-6 p-4 bg-zinc-50 rounded-lg dark:bg-zinc-700">
              <h3 class="text-base md:text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3">Add New Skill</h3>
              <div class="space-y-3">
                <input
                  v-model="newSkill.name"
                  type="text"
                  placeholder="Skill name"
                  class="w-full px-3 md:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-600 dark:border-zinc-500 dark:text-zinc-100"
                />
                <select
                  v-model="newSkill.category"
                  class="w-full px-3 md:px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-600 dark:border-zinc-500 dark:text-zinc-100"
                >
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
                <button
                  @click="handleAddSkill"
                  :disabled="skillsLoading"
                  class="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 text-sm"
                >
                  Add Skill
                </button>
              </div>
            </div>

            <!-- Skills List - Mobile Friendly Cards -->
            <div>
              <h3 class="text-base md:text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3">Current Skills</h3>
              
              <div v-for="category in categories" :key="category.id" class="mb-4">
                <h4 class="text-sm md:text-md font-semibold text-zinc-700 dark:text-zinc-300 mb-2">{{ category.name }}</h4>
                <div class="space-y-2">
                  <div
                    v-for="skill in skills.filter(s => s.category === category.id)"
                    :key="skill.id"
                    class="p-3 bg-zinc-50 rounded-lg dark:bg-zinc-700"
                  >
                    <div v-if="editSkill?.id === skill.id" class="space-y-2">
                      <input
                        v-model="editSkill.name"
                        type="text"
                        class="w-full px-3 py-1 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-600 dark:border-zinc-500 dark:text-zinc-100"
                      />
                      <select
                        v-model="editSkill.category"
                        class="w-full px-3 py-1 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-600 dark:border-zinc-500 dark:text-zinc-100"
                      >
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                      </select>
                      <div class="flex gap-2">
                        <button
                          @click="handleUpdateSkill"
                          class="flex-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                        >
                          Save
                        </button>
                        <button
                          @click="editSkill = null"
                          class="flex-1 px-3 py-1 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div v-else class="flex items-center justify-between">
                      <span class="text-sm text-zinc-700 dark:text-zinc-300">{{ skill.name }}</span>
                      <div class="flex gap-2">
                        <button
                          @click="editSkill = { id: skill.id, name: skill.name, category: skill.category }"
                          class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          @click="handleDeleteSkill(skill.id)"
                          class="text-xs text-red-600 hover:text-red-700 dark:text-red-400 px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
