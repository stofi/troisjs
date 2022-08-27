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
    <Camera ref="cameraRef" :position="{ x: -0.001 }" />

    <Scene ref="sceneRef">
      <Group :rotation="{ y: -store.sunRotation }">
        <Group
          :rotation="{ x: store.alignEcliptic ? -store.eclipticRotation.x : 0 }"
        >
          <slot />

          <ObjectStars :size="3" :constellation-opacity="zoomValue" />
          <Ring v-bind="ringProps" :rotation="{ y: Math.PI / 2 }">
            <BasicMaterial color="red" :props="ringMaterial" />
          </Ring>
          <Ring v-bind="ringProps" :rotation="{}">
            <BasicMaterial color="blue" :props="ringMaterial" />
          </Ring>
          <Ring v-bind="ringProps" :rotation="{ x: Math.PI / 2 }">
            <BasicMaterial color="green" :props="ringMaterial" />
          </Ring>
          <Group
            :rotation="{ y: -Math.PI / 9.2 + Math.PI + (123 / 180) * Math.PI }"
          >
            <Ring
              v-bind="ringProps"
              :rotation="{ x: (-28.91 / 180) * Math.PI }"
            >
              <BasicMaterial color="white" :props="ringMaterial" />
            </Ring>
          </Group>
          <Group :rotation="store.eclipticRotation">
            <Ring v-bind="ringProps" :rotation="{ x: Math.PI / 2 }">
              <BasicMaterial color="yellow" :props="ringMaterial" />
            </Ring>
          </Group>
        </Group>
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
import { computed } from 'vue'

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

import ObjectStars from '@/components/Object/ObjectStars.vue'
import useRenderer from '@/composables/useRenderer'
import useStore from '@/composables/useStore'

const store = useStore()

const { rendererRef, sceneRef, enableEffect, target, cameraRef, zoomValue } =
  useRenderer()

const ringProps = computed(() => ({
  innerRadius: 1,
  outerRadius: 1,
  thetaSegments: 1,
  phiSegments: 1,
  visible: store.showLines,
}))

const ringMaterial = computed(() => ({
  wireframe: true,
  side: 2,
  transparent: true,
  opacity: 0.01,
}))
</script>
