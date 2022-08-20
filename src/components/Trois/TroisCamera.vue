<template>
  <Camera ref="cameraRef" :position="{ z: 0.001 }" />
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onMounted, ref } from 'vue'

import { Camera } from 'troisjs'

const cameraRef = ref<ComponentPublicInstance<typeof Camera>>()

onMounted(() => {
  const cameraComponent = cameraRef.value
  if (!cameraComponent) return
  const camera = cameraComponent.camera
  camera.near = 1e-6
  camera.far = 1e27
  camera.fov = 1.2
  camera.fov *= 2
})
</script>
