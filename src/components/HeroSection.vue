<template>
  <section
    class="hero-section text-white flex flex-center"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
    <div class="hero-overlay absolute-full"></div>
    <div class="hero-content text-center z-top fade-in" style="width: 100%; max-width: 800px">
      <div class="cursive-font q-mb-lg" style="text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); line-height: 1.3">
        {{ name }}
      </div>

      <div class="flex flex-center q-my-lg row no-wrap items-center justify-center">
        <div class="separator-line"></div>
        <div
          class="subtitle-font text-caption q-mx-md"
          style="letter-spacing: 3px; font-style: italic"
        >
          {{ heroText }}
        </div>
        <div class="separator-line"></div>
      </div>

      <div class="subtitle-font q-mt-lg" style="letter-spacing: 4px; font-size: 0.9rem">
        {{ dateText }}
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  heroText: {
    type: String,
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  dateText: {
    type: String,
  },
})
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; // Parallax effect
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.3); // Slight dark overlay for text readability
}

.hero-content {
  padding: 20px;
}

.separator-line {
  height: 1px;
  background-color: var(--q-secondary);
  width: 50px;
  flex: none;
}
</style>
