<script setup lang="ts">
</script>

<template>
  <Container id="contact">
    <MotionGroup preset="slideVisibleOnceBottom" :duration="1000" :delay="100">
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
        <Button><a href="mailto:heavenlyvenerable66@gmail.com">Say Hello</a></Button>
      </div>
    </MotionGroup>
  </Container>
</template>
