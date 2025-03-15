<script setup lang="ts">
import Button from "../Button.vue";
import Container from "../Container.vue";
</script>

<template>
  <Container id="contact">
    <div class="flex flex-col items-center">
      <h4 class="text-green-dark text-base font-mono font-extralight">
        03. What’s Next?
      </h4>
      <h2 class="mt-2 text-lightest-slate-dark text-4xl font-bold">
        Get In Touch
      </h2>
      <p class="text-slate-dark text-center mt-4">
        I am excited to connect and explore new opportunities in Frontend
        Development. Feel free to reach out via email or LinkedIn—I’d love to
        discuss how my skills and enthusiasm can contribute to your team!
      </p>
    </div>
    <div class="flex justify-center">
      <Button>Say Hello</Button>
    </div>
  </Container>
</template>
