<script setup lang="ts">
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
    <div v-motion-slide-visible-once-bottom :duration="700" class="flex justify-center">
      <Button><a href="mailto:heavenlyvenerable66@gmail.com">Say Hello</a></Button>
    </div>
  </Container>
</template>
