<template>
  <Points ref="pointsRef" :scale="{ x: -1 }" :rotation="{ y: Math.PI }">
    <PointsMaterial
      :props="{
        size: props.size,
        sizeAttenuation: false,
        vertexColors: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }"
    >
      <Texture src="/circle.png" />
    </PointsMaterial>
    <!-- <ShaderMaterial :props="PointsShader"></ShaderMaterial> -->
  </Points>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, defineProps, onMounted, ref } from 'vue'

import { AdditiveBlending, BufferAttribute, BufferGeometry } from 'three'
import { Points, PointsMaterial, ShaderMaterial } from 'troisjs'

import Stars from '../Stars'
import { map } from '../utils'
import PointsShader from './PointsShader'

const props = defineProps({
  size: {
    type: Number,
    default: 3,
  },
})

const pointsRef = ref<ComponentPublicInstance<typeof Points>>()

const stars = new Stars()

onMounted(() => {
  const pointsComponent = pointsRef.value

  if (pointsComponent) {
    const particlesGeometry = new BufferGeometry()

    const count = stars.count
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const star = stars.getStarAt(i)
      const index = i * 3

      positions[index] = star.cartesian.x
      positions[index + 1] = star.cartesian.y
      positions[index + 2] = star.cartesian.z

      let value = parseFloat(star.V)

      value = map(value, stars.minV, stars.maxV, 0, 1)
      sizes[i] = value
      // value = 1 - Math.pow(1 - value, 0.4)
      colors[index] = value
      colors[index + 1] = value
      colors[index + 2] = value
    }

    particlesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )

    particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3))
    particlesGeometry.setAttribute('size', new BufferAttribute(sizes, 1))

    pointsComponent.setGeometry(particlesGeometry)
  }
})
</script>
