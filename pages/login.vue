<script setup lang="ts">
const { loggedIn, fetch: refreshSession } = useUserSession();
const router = useRouter();

// Redirect if already logged in
if (loggedIn.value) {
  await router.push('/dashboard');
}

const formData = ref({
  email: '',
  password: '',
  remember: false
});

const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const { $api } = useNuxtApp();
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: formData.value
    });

    if (response.success) {
      // Refresh session
      await refreshSession();
      // Redirect to dashboard
      await router.push('/dashboard');
    } else {
      error.value = response.message || 'Login failed';
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid email or password';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-center text-3xl font-bold text-green-500">Portfolio CMS</h1>
      <h2 class="mt-6 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-zinc-800">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Error Message -->
          <div v-if="error"
            class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-300">
            {{ error }}
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" v-model="formData.email" type="email" required autocomplete="email"
                class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                placeholder="admin@example.com" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <div class="mt-1">
              <input id="password" v-model="formData.password" type="password" required autocomplete="current-password"
                class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                placeholder="••••••••" />
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember" v-model="formData.remember" type="checkbox"
                class="h-4 w-4 rounded border-zinc-300 text-green-500 focus:ring-green-500" />
              <label for="remember" class="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                Remember me
              </label>
            </div>
          </div>

          <!-- Submit button -->
          <div>
            <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
