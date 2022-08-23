<template>
  <Scene ref="sceneRef">
    <DirectionalLight :target="target" :intensity="0.4" />
    <slot />
    <AppStars :size="10" />
  </Scene>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onBeforeUnmount, onMounted, ref } from 'vue'

import { AdditiveBlending, TextureLoader, Vector3 } from 'three'
import * as THREE from 'three'
import { BasicMaterial, DirectionalLight, Ring, Scene } from 'troisjs'

import AppStars from '../AppStars.vue'

const sceneRef = ref<ComponentPublicInstance<typeof Scene>>()
const loader = new TextureLoader()
let timer: ReturnType<typeof setInterval>

const target = ref<Vector3>(new Vector3(0, 0, -1))
let angle = 0
const increment = -0.005

onMounted(() => {
  const sceneComponent = sceneRef.value
  if (!sceneComponent) return

  const scene = sceneComponent.scene
  const texture = loader.load('/constellation_figures_2k.jpg')
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.mapping = THREE.EquirectangularRefractionMapping
  scene.background = texture

  timer = setInterval(() => {
    angle += increment
    angle = angle % (Math.PI * 2)
    target.value.set(Math.sin(angle), 0, Math.cos(angle))
  }, 16)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
