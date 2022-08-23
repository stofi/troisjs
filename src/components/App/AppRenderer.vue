<template>
  <!-- 3D -->
  <Renderer
    ref="rendererRef"
    alpha
    resize="window"
    :params="{
      logarithmicDepthBuffer: true,
    }"
    :orbit-ctrl="{
      enableZoom: false,
      enableRotate: true,
      enablePan: false,
      rotateSpeed: 0.025,
      enableDamping: true,
    }"
  >
    <Camera ref="cameraRef" :position="{ z: 0.001 }" />

    <Scene ref="sceneRef">
      <DirectionalLight :target="target" :intensity="0.4" />
      <slot />

      <AppStars :size="3" />
    </Scene>
    <EffectComposer v-if="enableEffect">
      <RenderPass />
      <UnrealBloomPass :strength="1" />
      <FilmPass :noise-intensity="0.3" />
    </EffectComposer>
  </Renderer>
  <!-- UI -->
  <Teleport to="#teleport-header">
    <div v-for="text in texts" :key="text">
      {{ text }}
    </div>
    <div class="whitespace-pre-line">
      {{ starsText }}
    </div>
  </Teleport>
  <Teleport to="#teleport-footer">
    <div class="flex items-center justify-center w-full h-full">
      <div class="relative w-full md:w-1/3">
        <div
          class="absolute inset-0 w-full h-12 p-0 border-2 pointer-events-none md:h-8 border-stone-100/10 rounded-xl bg-stone-700/5 focus:outline-none focus:ring-0 focus:shadow-none backdrop-blur-md"
        ></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <label
            for="customRange1"
            class="pb-1 pointer-events-none text-stone-300"
            >Zoom</label
          >
        </div>
        <input
          id="customRange1"
          type="range"
          class="relative z-10 w-full h-12 p-0 px-2 bg-transparent appearance-none pointer-events-auto md:h-8 focus:outline-none focus:ring-0 focus:shadow-none"
          min="0"
          max="1"
          step="0.01"
          :value="inputValue"
          @input="onInput"
        />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  Camera,
  DirectionalLight,
  EffectComposer,
  FilmPass,
  Renderer,
  RenderPass,
  Scene,
  UnrealBloomPass,
} from 'troisjs'

import AppStars from '@/components/App/AppStars.vue'
import useRenderer from '@/composables/useRenderer'

const {
  rendererRef,
  sceneRef,
  enableEffect,
  renderer,
  controls,
  camera,
  composer,
  target,
  cameraRef,
  onInput,
  inputValue,
  starsText,
  texts,
  // getStars,
} = useRenderer()
</script>
