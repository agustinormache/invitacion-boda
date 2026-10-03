<template>
  <section class="rsvp-section bg-white q-py-xl text-center" style="background-color: #ffffff">
    <div class="q-container q-px-md max-width-1000 q-mx-auto">
      <div class="row justify-center q-col-gutter-lg">
        <!-- Asistencia -->
        <div class="col-12 col-md-6">
          <q-icon name="how_to_reg" size="3rem" class="q-mb-sm" style="color: var(--q-primary)" />
          <div
            class="title-font text-primary-dark q-mb-sm"
            style="font-size: 2rem; font-family: 'Playfair Display', serif"
          >
            Asistencia
          </div>
          <p
            class="text-body2 q-mb-md text-grey-8"
            style="font-weight: 300; font-family: 'Montserrat', sans-serif"
          >
            Esperamos que nos puedas acompañar en este día tan importante.
          </p>
          <q-btn
            unelevated
            class="rounded-btn text-white"
            style="background-color: var(--q-primary); font-family: 'Montserrat', sans-serif"
            label="CONFIRMAR ASISTENCIA"
            @click="showRsvpModal = true"
          />
        </div>

        <!-- Playlist -->
        <div class="col-12 col-md-6">
          <q-icon name="library_music" size="3rem" class="q-mb-sm" style="color: var(--q-primary)" />
          <div
            class="title-font text-primary-dark q-mb-sm"
            style="font-size: 2rem; font-family: 'Playfair Display', serif"
          >
            Música
          </div>
          <p
            class="text-body2 q-mb-md text-grey-8"
            style="font-weight: 300; font-family: 'Montserrat', sans-serif"
          >
            ¿Qué canción no puede faltar en la fiesta?
          </p>
          <q-btn
            unelevated
            class="rounded-btn text-white"
            style="background-color: var(--q-primary); font-family: 'Montserrat', sans-serif"
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
          <div
            class="text-h6 subtitle-font text-primary"
            style="font-family: 'Montserrat', sans-serif"
          >
            Confirmar Asistencia
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="submitRsvp" class="q-gutter-md">
            <q-input
              filled
              v-model="rsvpForm.nombre"
              label="Nombre *"
              lazy-rules
              :rules="[(val) => (val && val.trim().length > 0) || 'Por favor ingresá tu nombre']"
            />
            <q-input
              filled
              v-model="rsvpForm.apellido"
              label="Apellido *"
              lazy-rules
              :rules="[(val) => (val && val.trim().length > 0) || 'Por favor ingresá tu apellido']"
            />
            <q-select
              filled
              v-model="rsvpForm.asiste"
              :options="asisteOptions"
              label="¿Asistís? *"
              emit-value
              map-options
              lazy-rules
              :rules="[(val) => !!val || 'Por favor seleccioná una opción']"
            />
            <q-select
              v-if="rsvpForm.asiste === 'SI'"
              filled
              v-model="rsvpForm.tipo"
              :options="tipoOptions"
              label="Invitación a *"
              emit-value
              map-options
              lazy-rules
              :rules="[(val) => !!val || 'Por favor seleccioná una opción']"
            />
            <q-input filled v-model="rsvpForm.menu" label="Restricciones alimenticias (opcional)" />

            <div class="text-right">
              <q-btn
                label="Enviar"
                type="submit"
                style="
                  background-color: var(--q-primary);
                  color: white;
                  font-family: 'Montserrat', sans-serif;
                "
                :loading="isSubmittingRsvp"
                class="rounded-btn"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Playlist Modal -->
    <q-dialog v-model="showPlaylistModal">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div
            class="text-h6 subtitle-font text-primary"
            style="font-family: 'Montserrat', sans-serif"
          >
            Sugerir Canción
          </div>
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
              :rules="[(val) => (val && val.trim().length > 0) || 'Por favor ingresá una canción']"
            />
            <q-input
              filled
              v-model="playlistForm.autor"
              label="Intérprete/Autor *"
              lazy-rules
              :rules="[(val) => (val && val.trim().length > 0) || 'Por favor ingresá el intérprete']"
            />

            <div class="text-right">
              <q-btn
                label="Enviar"
                type="submit"
                style="
                  background-color: var(--q-primary);
                  color: white;
                  font-family: 'Montserrat', sans-serif;
                "
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
  googleScriptUrl: {
    type: String,
    required: true,
  },
})

const $q = useQuasar()

// Modals state
const showRsvpModal = ref(false)
const showPlaylistModal = ref(false)

// Loading states
const isSubmittingRsvp = ref(false)
const isSubmittingPlaylist = ref(false)

// Forms state
const rsvpForm = reactive({ nombre: '', apellido: '', asiste: 'SI', menu: '', tipo: '' })
const playlistForm = reactive({ cancion: '', autor: '' })

const asisteOptions = [
  { label: 'Sí, confirmo', value: 'SI' },
  { label: 'No podré asistir', value: 'NO' },
]

const tipoOptions = [
  { label: 'Ceremonia y Fiesta', value: 'Ceremonia y Fiesta' },
  { label: 'Solo Ceremonia', value: 'Solo Ceremonia' },
  { label: 'Solo Fiesta', value: 'Solo Fiesta' },
]

const submitRsvp = async () => {
  if (props.googleScriptUrl === 'URL_DE_TU_GOOGLE_APPS_SCRIPT') {
    $q.notify({ type: 'warning', message: 'Configurá la URL del script en config.json' })
    return
  }
  isSubmittingRsvp.value = true
  try {
    const formData = new URLSearchParams()
    formData.append('formType', 'rsvp')
    formData.append('nombre', rsvpForm.nombre)
    formData.append('apellido', rsvpForm.apellido)
    formData.append('asiste', rsvpForm.asiste)
    formData.append('menu', rsvpForm.menu)
    formData.append('tipo', rsvpForm.asiste === 'SI' ? rsvpForm.tipo : '-')

    await fetch(props.googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
    $q.notify({ type: 'positive', message: '¡Gracias por responder!' })
    showRsvpModal.value = false
    Object.assign(rsvpForm, { nombre: '', apellido: '', asiste: 'SI', menu: '', tipo: '' })
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
      mode: 'no-cors',
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
