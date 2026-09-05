<template>
  <footer
    class="footer-section text-primary-dark q-py-xl text-center"
    style="background-color: var(--q-secondary)"
  >
    <div class="q-container q-px-md max-width-800 q-mx-auto">
      <div
        class="title-font q-mb-md text-primary-dark"
        style="font-size: 4rem; font-family: 'Playfair Display', serif"
      >
        {{ name }}
      </div>
      <p
        class="text-body1 q-mb-lg text-primary-dark"
        style="font-family: 'Montserrat', sans-serif; opacity: 0.9"
      >
        {{ footerText }}
      </p>

      <div
        class="q-mt-xl text-caption text-primary"
        style="font-family: 'Montserrat', sans-serif; opacity: 0.8"
      >
        Desarrollado con ❤️ por
        <a
          :href="developerLink"
          target="_blank"
          class="text-primary-dark"
          style="text-decoration: underline; font-weight: 500"
          >UNO SEI</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  footerText: {
    type: String,
    required: true,
  },
  developerLink: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.max-width-800 {
  max-width: 800px;
}
</style>
