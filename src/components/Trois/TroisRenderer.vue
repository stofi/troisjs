<template>
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
    <slot />
    <EffectComposer>
      <RenderPass />
      <SkyPass
        v-if="composer && renderer && camera && enableEffect"
        ref="skyPassRef"
        :camera="camera"
        :composer="composer"
        :renderer="renderer"
      />
      <UnrealBloomPass :strength="1" />
      <FilmPass :noise-intensity="0.3" />
    </EffectComposer>
  </Renderer>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onMounted, ref } from 'vue'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as EC from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {
  EffectComposer,
  FilmPass,
  Renderer,
  RenderPass,
  UnrealBloomPass,
} from 'troisjs'

import SkyPass from '../Effects/SkyPass'

const rendererRef = ref<ComponentPublicInstance<typeof Renderer>>()
const skyPassRef = ref<ComponentPublicInstance<typeof SkyPass>>()

const enableEffect = ref(false)

const renderer = ref<THREE.WebGLRenderer>()
const controls = ref<OrbitControls>()
const camera = ref<THREE.PerspectiveCamera>()
const composer = ref<EC.EffectComposer>()

onMounted(() => {
  const rendererComponent = rendererRef.value
  if (!rendererComponent) return
  renderer.value = rendererComponent.renderer as THREE.WebGLRenderer
  controls.value = rendererComponent.three.cameraCtrl as OrbitControls
  camera.value = rendererComponent.three.camera as THREE.PerspectiveCamera
  composer.value = rendererComponent.three.composer as EC.EffectComposer

  // const offset = Math.PI / 360

  // controls.value.maxPolarAngle = Math.PI / 2 + offset
  // controls.value.minPolarAngle = Math.PI / 2 - offset
  // controls.value.minAzimuthAngle = 2 * Math.PI - offset
  // controls.value.maxAzimuthAngle = 2 * Math.PI + offset

  rendererComponent.onBeforeRender(() => {
    if (!skyPassRef.value) return
    skyPassRef.value.update()
  })

  enableEffect.value = true
})
</script>
