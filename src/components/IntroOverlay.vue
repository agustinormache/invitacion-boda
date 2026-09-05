<template>
  <transition name="fade">
    <div
      v-if="show"
      class="intro-overlay flex flex-center z-max fixed-full"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="overlay-backdrop"></div>
      <div class="text-center content-box">
        <div class="text-overline text-white q-mb-sm" style="letter-spacing: 2px">
          ¡NOS CASAMOS!
        </div>
        <div class="cursive-font q-mb-xl" style="line-height: 1.3">{{ name }}</div>
        <q-btn
          unelevated
          outline
          class="rounded-btn open-btn text-white"
          label="ABRIR INVITACIÓN"
          @click="openInvitation"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  name: String,
  heroImage: String,
})
const emit = defineEmits(['open'])

const openInvitation = () => {
  emit('open')
}
</script>

<style lang="scss" scoped>
.intro-overlay {
  background-size: cover;
  background-position: center;
}
.overlay-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.content-box {
  position: relative;
  z-index: 1;
  color: white;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}
.open-btn {
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 10px 40px;
  letter-spacing: 1px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
