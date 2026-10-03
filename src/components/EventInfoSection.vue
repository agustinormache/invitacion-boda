<template>
  <section
    class="event-info-section flex flex-center text-center relative-position"
    style="
      background-image: url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80');
    "
  >
    <div class="overlay-backdrop"></div>
    <div
      class="z-top content-box q-py-xl"
      style="width: 100%; padding-top: 100px; padding-bottom: 100px"
    >
      <div class="max-width-1000 q-mx-auto q-px-md" style="width: 100%">
        <div class="row justify-center q-col-gutter-xl">
          <!-- Ceremonia -->
        <div class="col-12 col-md-6" v-if="ceremonia">
          <q-icon name="church" size="3rem" class="q-mb-sm" style="color: var(--q-primary)" />
          <div
            class="subtitle-font q-mb-md text-primary-dark"
            style="font-size: 1.5rem;"
          >
            CEREMONIA
          </div>
          <div
            class="text-caption text-primary q-mb-md"
            style="font-size: 1rem; font-weight: 400; font-family: 'Montserrat', sans-serif; line-height: 1.5;"
          >
            <div>{{ ceremonia.timeText }}</div>
            <div style="font-weight: 600">{{ ceremonia.venue }}</div>
            <div>{{ ceremonia.address }}</div>
          </div>
          <q-btn
            unelevated
            type="a"
            :href="ceremonia.mapUrl"
            target="_blank"
            class="rounded-btn"
            style="
              background-color: var(--q-primary);
              color: white;
              padding: 8px 24px;
              font-weight: 600;
              font-family: 'Montserrat', sans-serif;
            "
            label="Llegar a la Ceremonia"
          />
        </div>

        <!-- Fiesta -->
        <div class="col-12 col-md-6" v-if="fiesta">
          <q-icon name="celebration" size="3rem" class="q-mb-sm" style="color: var(--q-primary)" />
          <div
            class="subtitle-font q-mb-md text-primary-dark"
            style="font-size: 1.5rem;"
          >
            FIESTA
          </div>
          <div
            class="text-caption text-primary q-mb-md"
            style="font-size: 1rem; font-weight: 400; font-family: 'Montserrat', sans-serif; line-height: 1.5;"
          >
            <div>{{ fiesta.timeText }}</div>
            <div style="font-weight: 600">{{ fiesta.venue }}</div>
            <div>{{ fiesta.address }}</div>
          </div>
          <q-btn
            unelevated
            type="a"
            :href="fiesta.mapUrl"
            target="_blank"
            class="rounded-btn"
            style="
              background-color: var(--q-primary);
              color: white;
              padding: 8px 24px;
              font-weight: 600;
              font-family: 'Montserrat', sans-serif;
            "
            label="Llegar a la Fiesta"
          />
        </div>
        </div>
      </div>

      <div class="flex flex-center q-mt-xl">
        <q-btn
          outline
          type="a"
          :href="calendarUrl"
          target="_blank"
          class="rounded-btn"
          style="
            color: var(--q-primary);
            border-color: var(--q-primary);
            padding: 10px 30px;
            font-family: 'Montserrat', sans-serif;
            background: rgba(255, 255, 255, 0.4);
          "
          label="Añadir al Calendario"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ceremonia: Object,
  fiesta: Object,
  calendarTitle: String,
  eventDate: String,
})

// Generate Google Calendar URL
const calendarUrl = computed(() => {
  const endDateObj = new Date(props.eventDate)
  endDateObj.setHours(endDateObj.getHours() + 8)
  const endDate = endDateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const startDateZ =
    new Date(props.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const location = props.ceremonia ? props.ceremonia.venue + ', ' + props.ceremonia.address : ''

  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(props.calendarTitle)}&dates=${startDateZ}/${endDate}&details=Acompañanos+en+nuestra+boda!&location=${encodeURIComponent(location)}`
})
</script>

<style lang="scss" scoped>
.event-info-section {
  position: relative;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.max-width-1000 {
  max-width: 1000px;
}

.overlay-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(240, 235, 225, 0.85); // Light overlay using the var(--q-secondary) color approximately
}

.content-box {
  position: relative;
  z-index: 1;
}
</style>
