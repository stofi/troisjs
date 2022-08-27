<template>
  <Sphere
    ref="sphereRef"
    :rotation="{ y: -Math.PI / 2 }"
    :radius="996000"
    :width-segments="256"
    :height-segments="256"
  >
    <ShaderMaterial :props="SunShader"> </ShaderMaterial>
  </Sphere>

  <PointLight :position="{ x: 0, y: 0, z: 0 }" :intensity="0.5"></PointLight>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onMounted, ref } from 'vue'

import { TextureLoader } from 'three'
import { PointLight, ShaderMaterial, Sphere } from 'troisjs'

import SunShader from '@/shaders/SunShader'

const loader = new TextureLoader()
const sphereRef = ref<ComponentPublicInstance<typeof Sphere>>()

const blackbodyTexture = loader.load('/blackbody_1px.png')

onMounted(() => {
  const sunComponent = sphereRef.value

  if (sunComponent) {
    sunComponent.material.uniforms.tBlackBody.value = blackbodyTexture
  }
})
</script>

<!-- :position="{ x: 149597871, y: 0, z: 0 }" -->
