<script setup lang="ts">
const { sendMessage, loading } = useMessages();
const { profile, fetchProfile } = useProfile();

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const formStatus = ref<'idle' | 'success' | 'error'>('idle');
const errorMessage = ref('');

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    errorMessage.value = 'Please fill in all fields';
    formStatus.value = 'error';
    return;
  }

  const result = await sendMessage(formData.value);

  if (result) {
    formStatus.value = 'success';
    formData.value = { name: '', email: '', message: '' };
    setTimeout(() => {
      formStatus.value = 'idle';
    }, 3000);
  } else {
    formStatus.value = 'error';
    errorMessage.value = 'Failed to send message. Please try again.';
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <Container id="contact">
    <div class="flex flex-col items-center">
      <h4 v-motion-slide-visible-once-bottom :duration="700"
        class="text-green-600 text-base font-mono font-extralight dark:text-green-500">
        03. What’s Next?
      </h4>
      <h2 v-motion-slide-visible-once-bottom :duration="700"
        class="mt-2 text-zinc-900 text-4xl font-bold dark:text-zinc-300">
        Get In Touch
      </h2>
      <p v-motion-slide-visible-once-bottom :duration="700" class="text-zinc-600 text-center mt-4 dark:text-zinc-500">
        I am excited to connect and explore new opportunities in Frontend
        Development. Feel free to reach out via email or LinkedIn—I’d love to
        discuss how my skills and enthusiasm can contribute to your team!
      </p>
    </div>
    <div v-motion-slide-visible-once-bottom :duration="700" class="max-w-2xl mx-auto mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-mono text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
            <input id="name" v-model="formData.name" type="text" required
              class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              :disabled="loading" />
          </div>
          <div>
            <label for="email" class="block text-sm font-mono text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
            <input id="email" v-model="formData.email" type="email" required
              class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              :disabled="loading" />
          </div>
        </div>

        <div>
          <label for="message" class="block text-sm font-mono text-zinc-700 dark:text-zinc-300 mb-1">Message</label>
          <textarea id="message" v-model="formData.message" rows="4" required
            class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            :disabled="loading"></textarea>
        </div>

        <!-- Status Messages -->
        <div v-if="formStatus === 'success'" class="p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Message sent successfully! I'll get back to you soon.
        </div>

        <div v-if="formStatus === 'error'" class="p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {{ errorMessage }}
        </div>

        <div class="flex justify-center">
          <Button type="submit" :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Message' }}
          </Button>
        </div>
      </form>

      <!-- Alternative Contact -->
      <div class="mt-8 text-center">
        <p class="text-zinc-600 dark:text-zinc-400">
          Or reach me directly at:
          <a :href="`mailto:${profile?.email || 'someone@gmail.com'}`" class="text-green-500 hover:underline">
            {{ profile?.email || 'someone@gmail.com' }}
          </a>
        </p>
      </div>
    </div>
  </Container>
</template>
