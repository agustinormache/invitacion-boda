<template>
  <section class="gift-section text-center" style="background-color: var(--q-secondary); padding: 80px 0">
    <div class="q-container max-width-1000 q-mx-auto q-px-md">
      <div
        class="title-font text-primary-dark q-mb-sm"
        style="font-size: 2.5rem; font-family: 'Playfair Display', serif"
      >
        Regalos
      </div>

      <div
        class="card-style q-pa-xl text-center q-mt-lg"
        style="max-width: 600px; margin: 20px auto; background-color: #faf9f5"
      >
        <q-icon name="redeem" size="2.5rem" class="q-mb-md" style="color: var(--q-primary)" />
        <div
          class="subtitle-font text-primary-dark q-mb-sm"
          style="
            font-size: 1.1rem;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            text-transform: none;
            letter-spacing: 0;
          "
        >
          Tu presencia es nuestro mejor regalo.
        </div>
        <div class="text-caption text-grey-8 q-mb-lg" style="font-weight: 300; font-family: 'Montserrat', sans-serif">
          {{ bankAccount.giftText || 'Si deseás hacernos un regalo o colaborar con nuestra Luna de Miel podés hacerlo acá.' }}
        </div>

        <div class="q-mt-md text-center q-px-md" style="font-family: 'Montserrat', sans-serif">
          <div v-if="bankAccount.cbu" class="q-mt-sm">
            <strong>CBU:</strong> {{ bankAccount.cbu }}
            <q-btn flat dense icon="content_copy" size="sm" @click="copyText(bankAccount.cbu)" />
          </div>
          <div v-if="bankAccount.alias" class="q-mt-sm">
            <strong>Alias:</strong> {{ bankAccount.alias }}
            <q-btn flat dense icon="content_copy" size="sm" @click="copyText(bankAccount.alias)" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar'

defineProps({
  bankAccount: {
    type: Object,
    required: true,
  },
})

const $q = useQuasar()

const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      $q.notify({ type: 'positive', message: '¡Copiado al portapapeles!' })
    })
    .catch(() => {
      $q.notify({ type: 'negative', message: 'No se pudo copiar.' })
    })
}
</script>

<style lang="scss" scoped>
.max-width-1000 {
  max-width: 1000px;
}
.card-style {
  border-radius: 12px;
  border: 1px solid #e5e2d9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}
</style>
