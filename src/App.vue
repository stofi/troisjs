<template>
  <AppRenderer>
    <router-view />
  </AppRenderer>

  <!-- UI -->
  <Teleport v-if="store.texts && store.texts.length" to="#teleport-header">
    <div v-for="text in store.texts" :key="text">
      {{ text }}
    </div>
  </Teleport>
  <Teleport to="#teleport-left">
    <div class="h-full overflow-x-scroll">
      <div
        v-for="text in store.starsTexts"
        :key="text"
        class="whitespace-pre-wrap"
      >
        {{ text }}
      </div>
    </div>
  </Teleport>
  <Teleport to="#teleport-footer">
    <div class="flex flex-col items-center justify-center w-full h-full gap-2">
      <div class="flex gap-2">
        <!-- <InputButton text="get stars" @click="store.getStars" /> -->
        <InputButton text="show lines" @click="store.toggleLines" />
        <InputButton text="track sun" @click="store.toggleTrackSun" />
        <InputButton text="align ecliptic" @click="store.toggleAlignEcliptic" />
        <InputButton text="100x planets" @click="store.toggleMassivePlanets" />
        <InputButton
          text="constellations"
          @click="store.toggleConstellations"
        />
      </div>

      <InputRange
        :value="store.zoomValue"
        label="Zoom"
        class="w-full md:w-1/3"
        :min="0"
        :max="1"
        :step="0.01"
        @input="store.onZoom"
      />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import AppRenderer from '@/components/App/AppRenderer.vue'
import InputButton from '@/components/Input/InputButton.vue'
import InputRange from '@/components/Input/InputRange.vue'
import useStore from '@/composables/useStore'

const store = useStore()
</script>

<style>
html,
body {
  font-family: monospace;
  font-weight: bold;
}
</style>
