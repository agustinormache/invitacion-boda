<template>
  <div>
    <!-- Floating WhatsApp Button -->
    <!-- <q-btn
      round
      dense
      size="18px"
      color="positive"
      icon="chat"
      class="fixed-bottom-right z-max shadow-4"
      style="margin: 0 20px 20px 0;"
      :href="`https://wa.me/${whatsappNumber}`"
      target="_blank"
    >
      <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
        ¿Tenés dudas? ¡Consultanos!
      </q-tooltip>
    </q-btn> -->

    <!-- Floating Music Button -->
    <q-btn
      round
      dense
      size="15px"
      color="grey-8"
      text-color="white"
      :icon="isPlaying ? 'pause' : 'play_arrow'"
      class="fixed-top-right z-max shadow-4"
      style="margin: 20px 20px 0 0; opacity: 0.8"
      @click="toggleMusic"
    >
      <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"> Dale play </q-tooltip>
    </q-btn>

    <audio v-if="!isYoutube" ref="audioPlayer" :src="musicFile" loop preload="auto"></audio>
    <div
      v-else
      id="yt-player-container"
      style="
        position: absolute;
        left: -9999px;
        top: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
        pointer-events: none;
      "
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  whatsappNumber: {
    type: String,
    required: true,
  },
  musicFile: {
    type: String,
    required: true,
  },
})

const audioPlayer = ref(null)
const isPlaying = ref(false)
let ytPlayer = null
const isYtApiReady = ref(false)

const getYoutubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  if (url.length === 11) {
    return url
  }
  return null
}

const youtubeId = computed(() => getYoutubeId(props.musicFile))
const isYoutube = computed(() => !!youtubeId.value)

onMounted(() => {
  if (isYoutube.value) {
    initYoutubePlayer()
  }
})

const initYoutubePlayer = () => {
  const checkYT = () => {
    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      setTimeout(checkYT, 100)
    }
  }

  const createPlayer = () => {
    ytPlayer = new window.YT.Player('yt-player-container', {
      height: '1',
      width: '1',
      videoId: youtubeId.value,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: youtubeId.value,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          isYtApiReady.value = true
        },
      },
    })
  }

  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      document.head.appendChild(tag)
    }
  }

  checkYT()
}

const toggleMusic = () => {
  if (isYoutube.value) {
    if (!ytPlayer || !isYtApiReady.value) return
    if (isPlaying.value) {
      ytPlayer.pauseVideo()
    } else {
      ytPlayer.playVideo()
    }
    isPlaying.value = !isPlaying.value
  } else {
    if (!audioPlayer.value) return
    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const playMusic = () => {
  if (isYoutube.value) {
    const playWhenReady = () => {
      if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo()
        isPlaying.value = true
      } else {
        setTimeout(playWhenReady, 100)
      }
    }
    playWhenReady()
  } else {
    if (audioPlayer.value && !isPlaying.value) {
      audioPlayer.value.play()
      isPlaying.value = true
    }
  }
}

defineExpose({
  playMusic,
})
</script>
