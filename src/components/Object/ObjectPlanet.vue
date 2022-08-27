<template>
  <Group :rotation="{ x: inclination }">
    <Group :rotation="{ y: orbitProgress * Math.PI }">
      <Sphere
        ref="sphereRef"
        :radius="radius * (store.massivePlanets ? 100 : 1)"
        :position="{ x: -distance }"
        :width-segments="256"
        :height-segments="256"
      >
        <StandardMaterial
          :color="color"
          :props="{
            roughness: 0.4,
          }"
        >
        </StandardMaterial>
        <!-- <BasicMaterial :color="color"> </BasicMaterial> -->
      </Sphere>
    </Group>
  </Group>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

import { BasicMaterial, Group, Sphere, StandardMaterial } from 'troisjs'

import useStore from '@/composables/useStore'

const store = useStore()

defineProps({
  name: {
    type: String,
    default: 'Planet',
  },
  radius: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: '#ffffff',
  },
  orbitProgress: {
    type: Number,
    default: 0,
  },
  relativeYear: {
    type: Number,
    default: 0,
  },
  inclination: {
    type: Number,
    default: 0,
  },
})
</script>
