<template>
  <section
    class="countdown-section text-center"
    style="background-color: var(--q-secondary); padding: 60px 20px"
  >
    <div class="q-mb-lg flex flex-center">
      <q-icon name="favorite_border" size="4rem" style="color: var(--q-primary)" />
    </div>

    <!-- Nuestra boda -->
    <div
      class="title-font text-primary-dark q-mb-md"
      style="
        font-size: 1.8rem;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-family: 'Playfair Display', serif;
        font-weight: 500;
      "
    >
      Nuestra Boda
    </div>

    <!-- Mensaje -->
    <div
      class="q-mb-md q-mx-auto"
      style="
        font-family: 'Montserrat', sans-serif;
        font-size: 1.05rem;
        letter-spacing: 0.5px;
        max-width: 600px;
        font-weight: 300;
        line-height: 1.6;
        color: var(--q-primary);
      "
    >
      Hay momentos que se vuelven inolvidables cuando los compartimos con las personas que queremos.
      Por eso, deseo celebrar esta noche tan especial rodeada de quienes ocupan un lugar importante
      en mi corazón.
    </div>

    <!-- Firma de la quinceañera -->
    <div
      class="title-font text-primary-dark q-mb-xl"
      style="
        font-size: 2.2rem;
        font-style: italic;
        font-family: 'Playfair Display', serif;
        font-weight: normal;
      "
    >
      {{ name }}
    </div>

    <!-- Faltan... -->
    <div
      class="q-mb-md"
      style="
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        font-weight: 300;
        opacity: 0.8;
        color: var(--q-primary);
      "
    >
      Faltan...
    </div>

    <!-- Cuenta regresiva inline -->
    <div
      class="flex flex-center row no-wrap items-center justify-center q-mx-auto countdown-container"
    >
      <!-- Days -->
      <div class="countdown-unit-box">
        <div class="countdown-number">{{ timeRemaining.dias }}</div>
        <div class="countdown-label">días</div>
      </div>

      <!-- Colon -->
      <div class="countdown-colon">:</div>

      <!-- Hours -->
      <div class="countdown-unit-box">
        <div class="countdown-number">{{ timeRemaining.horas }}</div>
        <div class="countdown-label">hs</div>
      </div>

      <!-- Colon -->
      <div class="countdown-colon">:</div>

      <!-- Minutes -->
      <div class="countdown-unit-box">
        <div class="countdown-number">{{ timeRemaining.min }}</div>
        <div class="countdown-label">min</div>
      </div>

      <!-- Colon -->
      <div class="countdown-colon">:</div>

      <!-- Seconds -->
      <div class="countdown-unit-box">
        <div class="countdown-number">{{ timeRemaining.seg }}</div>
        <div class="countdown-label">seg</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
})

const timeRemaining = ref({
  dias: 0,
  horas: 0,
  min: 0,
  seg: 0,
})

let timer = null

const calculateTimeLeft = () => {
  const difference = +new Date(props.eventDate) - +new Date()

  if (difference > 0) {
    timeRemaining.value = {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      min: Math.floor((difference / 1000 / 60) % 60),
      seg: Math.floor((difference / 1000) % 60),
    }
  } else {
    timeRemaining.value = { dias: 0, horas: 0, min: 0, seg: 0 }
  }
}

onMounted(() => {
  calculateTimeLeft()
  timer = setInterval(calculateTimeLeft, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.countdown-container {
  max-width: 450px;
  color: var(--q-primary);
}

.countdown-unit-box {
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.1;
}

.countdown-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  margin-top: 4px;
  opacity: 0.8;
}

.countdown-colon {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1;
  margin: 0 5px;
  padding-bottom: 22px; // Offset to center colon with numbers vertically
  opacity: 0.7;
}
</style>
