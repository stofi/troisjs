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
      </Sphere>

      <Points
        ref="pointsRef"
        :position="{
          x: -distance,
          y: -radius * (store.massivePlanets ? 100 : 1),
        }"
      >
        <ShaderMaterial
          :props="{
            ...shader,
            size: 3,
            sizeAttenuation: false,
            vertexColors: true,
            depthWrite: false,
            blending: AdditiveBlending,
          }"
        ></ShaderMaterial>
      </Points>
    </Group>
  </Group>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, defineProps, onMounted, ref } from 'vue'

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Intersection,
  Texture,
  Vector3,
} from 'three'
import {
  BasicMaterial,
  Group,
  Plane,
  Points,
  ShaderMaterial,
  Sphere,
  StandardMaterial,
} from 'troisjs'

import useStore from '@/composables/useStore'
import PlanetLabel from '@/shaders/PlanetLabel'

const pointsRef = ref<ComponentPublicInstance<typeof Points>>()

const shader = ref({
  uniforms: {
    ...PlanetLabel.uniforms,
    uSize: { value: 1.0 },
    uTexture: { value: null },
  },
  vertexShader: PlanetLabel.vertexShader,
  fragmentShader: PlanetLabel.fragmentShader,
})

onMounted(() => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const texture = new Texture(canvas)
  canvas.width = 512
  canvas.height = 512

  if (pointsRef.value) {
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height)

      // context.font = 'bold 256px sans-serif'

      context.font = 'bold 128px "3270"'
      context.textAlign = 'center'
      context.textBaseline = 'bottom'
      context.fillStyle = '#ffffff'

      // add red square

      context.fillStyle = '#ffffff'
      context.fillText(props.name, canvas.width / 2, canvas.height)

      // update texture
      texture.needsUpdate = true
    }
    pointsRef.value.material.uniforms.uTexture.value = texture
  }

  const pointsComponent = pointsRef.value

  if (pointsComponent) {
    const particlesGeometry = new BufferGeometry()

    const count = 1
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const index = i * 3

      positions[index] = 0
      positions[index + 1] = 0
      positions[index + 2] = 0
    }

    particlesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )

    pointsComponent.setGeometry(particlesGeometry)
  }
})

const store = useStore()

const props = defineProps({
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
