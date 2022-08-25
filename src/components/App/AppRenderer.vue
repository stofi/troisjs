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

      <AppStars :size="3" :constellation-opacity="zoomValue" />
      <Ring v-bind="ringProps" :rotation="{ y: Math.PI / 2 }">
        <BasicMaterial color="red" :props="{ wireframe: true }" />
      </Ring>
      <Ring v-bind="ringProps" :rotation="{}">
        <BasicMaterial color="blue" :props="{ wireframe: true }" />
      </Ring>
      <Ring v-bind="ringProps" :rotation="{ x: Math.PI / 2 }">
        <BasicMaterial color="green" :props="{ wireframe: true }" />
      </Ring>
      <Group
        :rotation="{ y: -Math.PI / 9.2 + Math.PI + (123 / 180) * Math.PI }"
      >
        <Ring v-bind="ringProps" :rotation="{ x: (-28.91 / 180) * Math.PI }">
          <BasicMaterial color="white" :props="{ wireframe: true }" />
        </Ring>
      </Group>
      <Group>
        <Ring
          v-bind="ringProps"
          :rotation="{ x: Math.PI / 2 + (23.4 / 180) * Math.PI }"
        >
          <BasicMaterial color="yellow" :props="{ wireframe: true }" />
        </Ring>
      </Group>
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
  BasicMaterial,
  Camera,
  DirectionalLight,
  EffectComposer,
  FilmPass,
  Group,
  Renderer,
  RenderPass,
  Ring,
  Scene,
  UnrealBloomPass,
} from 'troisjs'

import AppStars from '@/components/App/AppStars.vue'
import useRenderer from '@/composables/useRenderer'

const { rendererRef, sceneRef, enableEffect, target, cameraRef, zoomValue } =
  useRenderer()

const ringProps = {
  innerRadius: 1,
  outerRadius: 1,
  thetaSegments: 1,
  phiSegments: 1,
  visible: false,
}
</script>
