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

      <AppStars :size="2" />
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
    <div class="flex items-end justify-center">
      <input
        :value="inputValue"
        class="pointer-events-auto"
        type="range"
        name="focalLength"
        min="0"
        max="1"
        step="0.01"
        @input="onInput"
      />
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
  focalLength,
  // getStars,
} = useRenderer()
</script>
