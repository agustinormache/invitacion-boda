<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page>
        <!-- Intro Overlay -->
        <IntroOverlay
          :show="showIntro"
          :name="config.general.name"
          :heroImage="config.hero.heroImage"
          @open="startExperience"
        />

        <!-- Components -->
        <HeroSection
          v-if="config.hero.show"
          :name="config.general.name"
          :heroText="config.hero.heroText"
          :heroImage="config.hero.heroImage"
          :dateText="config.hero.dateText"
        />

        <CountdownSection 
          v-if="config.countdown.show"
          :name="config.general.name" 
          :eventDate="config.countdown.eventDate" 
        />

        <EventInfoSection
          v-if="config.eventInfo.show"
          :ceremonia="config.eventInfo.ceremonia"
          :fiesta="config.eventInfo.fiesta"
          :calendarTitle="config.eventInfo.calendarTitle"
          :eventDate="config.eventInfo.eventDate"
        />

        <ImageGallery 
          v-if="config.gallery.show"
          :images="config.gallery.images" 
        />

        <DressCodeSection 
          v-if="config.dressCode.show"
          :dressCode="config.dressCode.text" 
        />

        <RsvpSection 
          v-if="config.rsvp.show"
          :googleScriptUrl="config.rsvp.googleScriptUrl" 
        />

        <GiftSection 
          v-if="config.gifts.show"
          :bankAccount="config.gifts.bankAccount" 
        />

        <AccommodationSection />

        <ThankYouFooter
          v-if="config.footer.show"
          :name="config.general.name"
          :footerText="config.footer.footerText"
          :developerLink="config.general.developerLink"
        />

        <!-- Floating Actions -->
        <FloatingActions
          ref="floatingActionsRef"
          :whatsappNumber="config.general.whatsappNumber"
          :musicFile="config.general.musicFile"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Import components
import IntroOverlay from '../components/IntroOverlay.vue'
import HeroSection from '../components/HeroSection.vue'
import CountdownSection from '../components/CountdownSection.vue'
import EventInfoSection from '../components/EventInfoSection.vue'
import ImageGallery from '../components/ImageGallery.vue'
import DressCodeSection from '../components/DressCodeSection.vue'
import GiftSection from '../components/GiftSection.vue'
import AccommodationSection from '../components/AccommodationSection.vue'
import RsvpSection from '../components/RsvpSection.vue'
import ThankYouFooter from '../components/ThankYouFooter.vue'
import FloatingActions from '../components/FloatingActions.vue'

// Import config
import configData from '../data/config.json'

const config = ref(configData)

const showIntro = ref(true)
const floatingActionsRef = ref(null)

onMounted(() => {
  if (showIntro.value) {
    document.body.style.overflow = 'hidden'
  }
})

const startExperience = () => {
  showIntro.value = false
  document.body.style.overflow = ''
  if (floatingActionsRef.value) {
    floatingActionsRef.value.playMusic()
  }
}
</script>
