<template>
  <section class="hero-section flex flex-center">
    <!-- Frame image for desktop/mobile handling -->
    <div class="frame-background"></div>

    <div class="hero-content text-center z-top fade-in" style="width: 100%; max-width: 800px">
      <div class="q-mb-lg" style="font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 12vw, 6rem); line-height: 1.1; color: var(--q-primary); text-transform: uppercase;">
        {{ name }}
      </div>

      <div class="flex flex-center q-my-lg row no-wrap items-center justify-center">
        <div class="separator-line"></div>
        <div
          class="subtitle-font text-caption q-mx-md"
          style="letter-spacing: 3px; font-style: italic; color: var(--q-primary)"
        >
          {{ heroText }}
        </div>
        <div class="separator-line"></div>
      </div>

      <div class="subtitle-font q-mt-lg" style="letter-spacing: 4px; font-size: 0.9rem; color: var(--q-primary)">
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
    required: false,
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
  overflow: hidden;
  background-color: #ffffff;
}

.frame-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../img/hero_frame.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.9;
}

.hero-content {
  padding: 20px;
}

.separator-line {
  height: 1px;
  background-color: var(--q-primary);
  width: 50px;
  flex: none;
}
</style>
