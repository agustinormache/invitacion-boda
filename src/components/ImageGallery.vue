<template>
  <section class="gallery-section q-py-lg">
    <div class="row q-col-gutter-sm q-px-sm">
      <div v-for="(img, index) in images" :key="index" class="col-12 col-sm-6 col-md-4">
        <q-img
          :src="img"
          spinner-color="primary"
          class="rounded-borders gallery-img"
          style="height: 350px; width: 100%; object-fit: cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.gallery-img {
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
}
</style>
