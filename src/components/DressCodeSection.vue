<template>
  <section
    class="dress-code-section text-center"
    style="background-color: var(--q-secondary); padding: 80px 0"
  >
    <div class="q-container max-width-800 q-mx-auto q-px-md">
      <q-icon name="checkroom" size="3rem" class="q-mb-md" style="color: var(--q-primary)" />
      <div
        class="title-font text-primary-dark q-mb-md"
        style="font-size: 2.5rem; font-family: 'Playfair Display', serif"
      >
        Código de Vestimenta
      </div>
      <div
        class="text-caption text-primary q-mb-sm"
        style="
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 1px;
        "
      >
        {{ dressCode }}
      </div>
      <p
        class="text-body2 text-primary-dark q-mb-none"
        style="
          font-weight: 300;
          font-family: 'Montserrat', sans-serif;
          padding-bottom: 20px;
          opacity: 0.9;
        "
      >
        Los esperamos para celebrar con su mejor outfit.
      </p>
      <div
        class="text-caption text-primary-dark q-mt-md"
        style="
          font-size: 1.2rem;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 2px;
          border-top: 1px solid var(--q-primary);
          border-bottom: 1px solid var(--q-primary);
          padding: 10px 0;
          display: inline-block;
        "
      >
        SIN NIÑOS
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  dressCode: {
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
