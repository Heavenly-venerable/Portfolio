<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const { messages, fetchMessages, markAsRead, deleteMessage, loading } = useMessages()

const selectedMessage = ref<any>(null)
const isOpen = ref(false)
const successMessage = ref('')

onMounted(() => {
  fetchMessages()
})

const viewMessage = async (message: any) => {
  selectedMessage.value = message
  isOpen.value = true

  if (!message.isRead) {
    await markAsRead(message.id)
    await fetchMessages()
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this message?')) {
    const success = await deleteMessage(id)
    if (success) {
      successMessage.value = 'Message deleted successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Messages</h1>
      <p class="text-zinc-600 dark:text-zinc-400">Manage contact form submissions</p>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage"
      class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 dark:bg-green-900 dark:border-green-800 dark:text-green-300">
      {{ successMessage }}
    </div>

    <!-- Messages List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-800">
      <div v-if="loading" class="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Loading...
      </div>

      <div v-else-if="!messages.length" class="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        No messages yet
      </div>

      <ul v-else role="list" class="divide-y divide-zinc-200 dark:divide-zinc-700">
        <li v-for="message in messages" :key="message.id" class="p-4 sm:px-6">
          <!-- Mobile: Card layout -->
          <div class="space-y-3">
            <!-- Header with name and status -->
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-sm font-medium text-green-600 dark:text-green-500">{{ message.name }}</p>
                  <span v-if="!message.isRead"
                    class="px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    New
                  </span>
                </div>
              </div>
              <button @click="handleDelete(message.id)"
                class="flex-shrink-0 text-sm text-red-600 hover:text-red-700 dark:text-red-400 px-2 py-1">
                Delete
              </button>
            </div>

            <!-- Email and date -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
              <span class="text-zinc-500 dark:text-zinc-400">{{ message.email }}</span>
              <span class="text-zinc-400 dark:text-zinc-500">{{ formatDate(message.createdAt) }}</span>
            </div>

            <!-- Message preview -->
            <p class="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 cursor-pointer"
              @click="viewMessage(message)">
              {{ message.message }}
            </p>

            <!-- View button - Full width on mobile -->
            <button @click="viewMessage(message)"
              class="w-full sm:w-auto mt-2 px-4 py-2 text-sm bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300">
              View Full Message
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Message Detail Modal - Mobile First -->
    <Dialog :open="isOpen" @close="isOpen = false" class="relative z-50">
      <div class="fixed inset-0 bg-zinc-900/80" aria-hidden="true" />

      <div class="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <DialogPanel
          class="w-full max-h-[90vh] overflow-y-auto bg-white rounded-t-xl sm:rounded-lg shadow-xl dark:bg-zinc-800">
          <!-- Modal Header - Sticky -->
          <div class="sticky top-0 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-4 sm:p-6">
            <DialogTitle class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <EnvelopeIcon class="h-5 w-5 text-green-500 flex-shrink-0" />
              <span class="truncate">Message from {{ selectedMessage?.name }}</span>
            </DialogTitle>
          </div>

          <!-- Modal Body -->
          <div v-if="selectedMessage" class="p-4 sm:p-6 space-y-4">
            <!-- Message details in card -->
            <div class="space-y-3 p-4 bg-zinc-50 rounded-lg dark:bg-zinc-700">
              <div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">From</p>
                <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">{{ selectedMessage.name }}</p>
              </div>

              <div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Email</p>
                <p class="text-sm text-zinc-900 dark:text-zinc-100 break-all">{{ selectedMessage.email }}</p>
              </div>

              <div>
                <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Received</p>
                <p class="text-sm text-zinc-900 dark:text-zinc-100">{{ formatDate(selectedMessage.createdAt) }}</p>
              </div>
            </div>

            <!-- Message content -->
            <div>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Message</p>
              <p
                class="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap bg-zinc-50 dark:bg-zinc-700 p-4 rounded-lg">
                {{ selectedMessage.message }}
              </p>
            </div>
          </div>

          <!-- Modal Footer - Sticky -->
          <div
            class="sticky bottom-0 bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 p-4 sm:p-6">
            <div class="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              <button type="button" @click="isOpen = false"
                class="w-full sm:w-auto px-4 py-3 sm:py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 text-sm">
                Close
              </button>
              <a :href="`mailto:${selectedMessage?.email}`"
                class="w-full sm:w-auto px-4 py-3 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center text-sm">
                Reply via Email
              </a>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>
