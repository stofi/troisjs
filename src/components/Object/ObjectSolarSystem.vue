<template>
  <!-- Ecliptic -->
  <Group :rotation="{ x: store.eclipticRotation.x }">
    <Group :rotation="{ x: 0.09599311, y: yRotation * 12 }">
      <ObjectMoon />
    </Group>
    <!-- Pivot -->
    <Group :rotation="{ y: yRotation }">
      <!-- Sun Local Space -->
      <Group :position="{ x: 149597871, y: 0, z: 0 }">
        <ObjectSun />
        <ObjectPlanet
          v-for="planet in planets"
          :key="planet.name"
          v-bind="planet"
        />
      </Group>
    </Group>
  </Group>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { Group } from 'troisjs'

import ObjectMoon from '@/components/Object/ObjectMoon.vue'
import ObjectPlanet from '@/components/Object/ObjectPlanet.vue'
import ObjectSun from '@/components/Object/ObjectSun.vue'
import useStore from '@/composables/useStore'

const yRotation = ref(0)

const store = useStore()

interface Planet {
  name: string
  radius: number
  distance: number
  color: string
  orbitProgress: number
  relativeYear: number
  inclination: number
  yearOffset: number
}

let timestamp = 0

onMounted(() => {
  timestamp = Date.now()
  const renderer = store.renderer
  if (!renderer) return

  renderer.onBeforeRender(() => {
    const delta = (Date.now() - timestamp) / 1000
    timestamp = Date.now()
    const secondsPerFullRot = 3600
    const increment = delta / secondsPerFullRot //* Math.PI * 2

    if (!store.stopTime) {
      store.time += increment * 31557600000
    }

    yRotation.value = store.getTime() * 2 * Math.PI

    planets.value.forEach((planet) => {
      planet.orbitProgress = 1 * store.getTime() * planet.relativeYear
    })

    if (store.trackSun) {
      store.sunRotation = yRotation.value
    }
  })
})

const planets = ref<Planet[]>([
  {
    orbitProgress: 0,
    name: 'Mercury',
    radius: 3032,
    distance: 57.9 * 1e6,
    color: '#60514f',
    relativeYear: 365 / 88,
    inclination: (7 * Math.PI) / 180,
    yearOffset: 3 / 8,
  },
  {
    orbitProgress: 0,
    name: 'Venus',
    radius: 7521,
    distance: 108.2 * 1e6,
    color: '#d9b611',
    relativeYear: 365 / 225,
    inclination: (3.4 * Math.PI) / 180,
    yearOffset: 7 / 32,
  },
  // {
  //   orbitProgress: 0,
  //   name: 'Earth',
  //   radius: 6371,
  //   distance: 149.6 * 1e6,
  //   color: '#3dc2ff',
  //   relativeYear: 1,
  //   inclination: 0,
  // yearOffset: 0,
  // },
  {
    orbitProgress: 0,
    name: 'Mars',
    radius: 3396,
    distance: 227.9 * 1e6,
    color: '#cc0000',
    relativeYear: 365 / 687,
    inclination: (1.85 * Math.PI) / 180,
    yearOffset: 23 / 32,
  },
  {
    orbitProgress: 0,
    name: 'Jupiter',
    radius: 69911,
    distance: 778.5 * 1e6,
    color: '#d5cda1',
    relativeYear: 365 / 4332,
    inclination: (1.3 * Math.PI) / 180,
    yearOffset: 7 / 8,
  },
  {
    orbitProgress: 0,
    name: 'Saturn',
    radius: 58232,
    distance: 1.4 * 1e9,
    color: '#c29f4a',
    relativeYear: 365 / 10756,
    inclination: (2.48 * Math.PI) / 180,
    yearOffset: 7 / 8,
  },
  {
    orbitProgress: 0,
    name: 'Uranus',
    radius: 25362,
    distance: 2.8 * 1e9,
    color: '#41bfec',
    relativeYear: 365 / 30687,
    inclination: (0.77 * Math.PI) / 180,
    yearOffset: 5 / 8,
  },
  {
    orbitProgress: 0,
    name: 'Neptune',
    radius: 24622,
    distance: 4.5 * 1e9,
    color: '#1574b8',
    relativeYear: 365 / 60190,
    inclination: (1.77 * Math.PI) / 180,
    yearOffset: 5 / 8,
  },
  {
    orbitProgress: 0,
    name: 'Pluto',
    radius: 1186,
    distance: 5.9 * 1e9,
    color: '#6e6e6e',
    relativeYear: 365 / 90560,
    inclination: (17.2 * Math.PI) / 180,
    yearOffset: 5 / 12,
  },
])
</script>
