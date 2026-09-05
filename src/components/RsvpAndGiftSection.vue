<template>
  <section class="rsvp-gift-section bg-white q-py-xl text-center">
    <div class="q-container q-px-md max-width-1000 q-mx-auto">
      <div class="row justify-center q-col-gutter-lg">
        <!-- Asistencia -->
        <div class="col-12 col-md-4">
          <q-icon name="how_to_reg" size="3rem" color="primary" class="q-mb-sm" />
          <div class="subtitle-font text-h6 q-mb-sm text-primary-dark">Asistencia</div>
          <p class="text-body2 q-mb-md text-grey-8">Confirmá tu presencia a la fiesta.</p>
          <q-btn
            unelevated
            class="rounded-btn bg-pastel text-primary-dark"
            label="CONFIRMAR ASISTENCIA"
            @click="showRsvpModal = true"
          />
        </div>

        <!-- Regalos -->
        <div class="col-12 col-md-4">
          <q-icon name="card_giftcard" size="3rem" color="primary" class="q-mb-sm" />
          <div class="subtitle-font text-h6 q-mb-sm text-primary-dark">Regalos</div>
          <p class="text-body2 q-mb-md text-grey-8">
            Si deseás hacerme un regalo podés colaborar con mi sueño.
          </p>
          <q-btn
            unelevated
            class="rounded-btn bg-pastel text-primary-dark"
            label="VER DATOS BANCARIOS"
            @click="showGiftModal = true"
          />
        </div>

        <!-- Playlist -->
        <div class="col-12 col-md-4">
          <q-icon name="library_music" size="3rem" color="primary" class="q-mb-sm" />
          <div class="subtitle-font text-h6 q-mb-sm text-primary-dark">Música</div>
          <p class="text-body2 q-mb-md text-grey-8">¿Qué canción no puede faltar en la fiesta?</p>
          <q-btn
            unelevated
            class="rounded-btn bg-pastel text-primary-dark"
            label="SUGERIR CANCIÓN"
            @click="showPlaylistModal = true"
          />
        </div>
      </div>
    </div>

    <!-- RSVP Modal -->
    <q-dialog v-model="showRsvpModal">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 subtitle-font text-primary">Confirmar Asistencia</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="submitRsvp" class="q-gutter-md">
            <q-input
              filled
              v-model="rsvpForm.nombre"
              label="Nombre y Apellido *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Por favor ingresá tu nombre']"
            />
            <q-select
              filled
              v-model="rsvpForm.asiste"
              :options="['Sí, confirmo', 'No podré asistir']"
              label="¿Asistís? *"
            />
            <q-input filled v-model="rsvpForm.menu" label="Restricciones alimenticias (opcional)" />

            <div class="text-right">
              <q-btn
                label="Enviar"
                type="submit"
                color="primary"
                :loading="isSubmittingRsvp"
                class="rounded-btn"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Gift Modal -->
    <q-dialog v-model="showGiftModal">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 subtitle-font text-primary">Datos Bancarios</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md text-center">
          <div class="q-mb-sm"><strong>Titular:</strong> {{ bankAccount.titular }}</div>
          <div class="q-mb-sm"><strong>Alias:</strong> {{ bankAccount.alias }}</div>
          <div class="q-mb-md"><strong>CBU:</strong> {{ bankAccount.cbu }}</div>
          <p class="text-caption text-grey">¡Muchas gracias por acompañarme!</p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Playlist Modal -->
    <q-dialog v-model="showPlaylistModal">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 subtitle-font text-primary">Sugerir Canción</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="submitPlaylist" class="q-gutter-md">
            <q-input
              filled
              v-model="playlistForm.cancion"
              label="Nombre de la canción *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Por favor ingresá una canción']"
            />
            <q-input
              filled
              v-model="playlistForm.autor"
              label="Intérprete/Autor *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Por favor ingresá el interprete']"
            />

            <div class="text-right">
              <q-btn
                label="Enviar"
                type="submit"
                color="primary"
                :loading="isSubmittingPlaylist"
                class="rounded-btn"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  bankAccount: {
    type: Object,
    required: true,
  },
  googleScriptUrl: {
    type: String,
    required: true,
  },
})

const $q = useQuasar()

// Modals state
const showRsvpModal = ref(false)
const showGiftModal = ref(false)
const showPlaylistModal = ref(false)

// Loading states
const isSubmittingRsvp = ref(false)
const isSubmittingPlaylist = ref(false)

// Forms state
const rsvpForm = reactive({ nombre: '', asiste: 'Sí, confirmo', menu: '' })
const playlistForm = reactive({ cancion: '', autor: '' })

const submitRsvp = async () => {
  if (props.googleScriptUrl === 'URL_DE_TU_GOOGLE_APPS_SCRIPT') {
    $q.notify({ type: 'warning', message: 'Configurá la URL del script en config.json' })
    return
  }
  isSubmittingRsvp.value = true
  try {
    // We send formType = 'rsvp' to distinguish in the Google Script
    const formData = new URLSearchParams()
    formData.append('formType', 'rsvp')
    formData.append('nombre', rsvpForm.nombre)
    formData.append('apellido', rsvpForm.apellido)
    formData.append('asiste', rsvpForm.asiste)
    formData.append('menu', rsvpForm.menu)

    await fetch(props.googleScriptUrl, {
      method: 'POST',
      body: formData,
    })
    $q.notify({ type: 'positive', message: '¡Gracias por responder!' })
    showRsvpModal.value = false
    Object.assign(rsvpForm, { nombre: '', asiste: 'Sí, confirmo', menu: '' }) // reset
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Hubo un error al enviar.' })
  } finally {
    isSubmittingRsvp.value = false
  }
}

const submitPlaylist = async () => {
  if (props.googleScriptUrl === 'URL_DE_TU_GOOGLE_APPS_SCRIPT') {
    $q.notify({ type: 'warning', message: 'Configurá la URL del script en config.json' })
    return
  }
  isSubmittingPlaylist.value = true
  try {
    const formData = new URLSearchParams()
    formData.append('formType', 'playlist')
    formData.append('cancion', playlistForm.cancion)
    formData.append('autor', playlistForm.autor)

    await fetch(props.googleScriptUrl, {
      method: 'POST',
      body: formData,
    })
    $q.notify({ type: 'positive', message: '¡Canción sugerida!' })
    showPlaylistModal.value = false
    Object.assign(playlistForm, { cancion: '', autor: '' }) // reset
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Hubo un error al enviar.' })
  } finally {
    isSubmittingPlaylist.value = false
  }
}
</script>

<style lang="scss" scoped>
.max-width-1000 {
  max-width: 1000px;
}
</style>
