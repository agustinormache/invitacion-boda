<template>
  <section class="gallery-section q-py-lg">
    <div class="row q-col-gutter-sm q-px-sm">
      <div v-for="(img, index) in images" :key="index" class="col-3">
        <q-img
          :src="img"
          spinner-color="primary"
          class="rounded-borders gallery-img"
          :ratio="9/16"
          style="width: 100%"
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
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: grayscale(100%);
  &:hover, &:active {
    transform: scale(1.02);
    filter: grayscale(0%);
  }
}
</style>
