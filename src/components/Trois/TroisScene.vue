<template>
  <Scene ref="sceneRef">
    <DirectionalLight :target="target" />
    <slot />
    <Points ref="pointsRef">
      <PointsMaterial
        :props="{
          size: 3,
          sizeAttenuation: false,
          vertexColors: true,
          depthWrite: false,
          blending: AdditiveBlending,
        }"
      >
        <Texture src="/circle.png" />
      </PointsMaterial>
    </Points>
  </Scene>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CubeTextureLoader,
  LinearFilter,
  NearestFilter,
  Vector3,
} from 'three'
import {
  DirectionalLight,
  Points,
  PointsMaterial,
  Scene,
  Texture,
} from 'troisjs'

import Stars from '../../Stars'
import { map } from '../../utils'

const sceneRef = ref<ComponentPublicInstance<typeof Scene>>()

let timer: ReturnType<typeof setInterval>

const target = ref<Vector3>(new Vector3(0, 0, -1))
let angle = 0
const increment = -0.005

const pointsRef = ref<ComponentPublicInstance<typeof Points>>()

const stars = new Stars()

onMounted(() => {
  const sceneComponent = sceneRef.value
  const pointsComponent = pointsRef.value
  if (!sceneComponent) return

  if (pointsComponent) {
    const particlesGeometry = new BufferGeometry()

    const count = stars.count
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const star = stars.getStarAt(i)
      const index = i * 3
      // const phi = rightAscentionToAngle(star.RA)
      // const theta = declinationToAngle(star.Dec)
      // const cartesian = sphericalToCartesian(1, phi, theta)

      positions[index] = star.cartesian.x
      positions[index + 1] = star.cartesian.y
      positions[index + 2] = star.cartesian.z

      let value = parseFloat(star.V)

      if (value + 0.5 >= stars.maxV) {
        colors[index] = 1
        colors[index + 1] = 0
        colors[index + 2] = 0
      } else {
        value = map(value, stars.minV, stars.maxV, 0, 1)
        value = 1 - Math.pow(1 - value, 0.4)
        colors[index] = value
        colors[index + 1] = value
        colors[index + 2] = value
      }

      // const u = map(phi, 0, Math.PI * 2, 0, 1)
      // const v = map(theta, 0, Math.PI, 0, 1)
    }

    particlesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )

    particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3))
    // particlesGeometry.setAttribute('size', new BufferAttribute(sizes, 1))

    pointsComponent.setGeometry(particlesGeometry)
  }

  const scene = sceneComponent.scene
  // scene.background = texture

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
