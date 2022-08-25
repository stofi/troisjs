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
      autoRotate: true,
      autoRotateSpeed: -0.005,
    }"
  >
    <Camera ref="cameraRef" :position="{ z: 0.001 }" />

    <Scene ref="sceneRef">
      <DirectionalLight :target="target" :intensity="0.4" />
      <slot />

      <AppStars :size="3" :constellation-opacity="zoomValue" />
    </Scene>
    <EffectComposer v-if="enableEffect">
      <RenderPass />
      <UnrealBloomPass :strength="1" />
      <FilmPass :noise-intensity="0.3" />
    </EffectComposer>
  </Renderer>
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

const { rendererRef, sceneRef, enableEffect, target, cameraRef, zoomValue } =
  useRenderer()
</script>
