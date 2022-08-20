<template>
  <Scene ref="sceneRef">
    <DirectionalLight :target="target" />
    <slot />
    <Points ref="pointsRef" :rotation="target2">
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

import stars from '../../stars.json'

const rightAscentionToAngle = (rightAscention: string) => {
  const [hours, minutes, seconds] = rightAscention
    .split(' ')
    .map((part) => parseFloat(part.replace(/[^0-9.]/g, '')))

  const angle = ((hours + minutes / 60 + seconds / 3600) * Math.PI) / 12

  // output is in the range of 0 to 2π
  return angle
}

const declinationToAngle = (declination: string) => {
  const [degrees, minutes, seconds] = declination
    .split(' ')
    .map((part) => parseFloat(part.replace(/[^0-9.]/g, '')))

  const sign = declination[0] === '-' ? -1 : 1

  const angle =
    (sign * (Math.abs(degrees) + minutes / 60 + seconds / 3600) * Math.PI) / 180

  return angle
}

const sphericalToCartesian = (
  radius: number,
  ascention: number,
  declination: number
) => {
  // spherical to cartesian XYZ Y is up
  const x = radius * Math.cos(ascention) * Math.cos(declination)
  const y = radius * Math.sin(ascention) * Math.cos(declination)
  const z = radius * Math.sin(declination)

  return new Vector3(x, z, y)
}

const loader = new CubeTextureLoader()

const sceneRef = ref<ComponentPublicInstance<typeof Scene>>()

let timer: ReturnType<typeof setInterval>

const target = ref<Vector3>(new Vector3(0, 0, -1))
const target2 = ref<Vector3>(new Vector3(1, 0, 0))
let angle = 0
let angle2 = 0
const increment = -0.005
const increment2 = -0.0001

const pointsRef = ref<ComponentPublicInstance<typeof Points>>()

const minV = stars.reduce((min, star) => Math.min(min, parseFloat(star.V)), 0)
const maxV = stars.reduce((max, star) => Math.max(max, parseFloat(star.V)), 0)

const medianV =
  stars.reduce((sum, star) => sum + parseFloat(star.V), 0) / stars.length
console.log(minV, maxV, medianV)

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

const map = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
  clampFlag = true
) => {
  const v = ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin

  return clampFlag ? clamp(v, toMin, toMax) : v
}
// console.log(map(0, minV, maxV, 0, 1))
// console.log(map(0, minV, maxV, 0, 1))
// console.log(map(-1.46, minV, maxV, 0, 1))
// console.log(map(7.96, minV, maxV, 0, 1))

onMounted(() => {
  const sceneComponent = sceneRef.value
  const pointsComponent = pointsRef.value
  if (!sceneComponent) return

  if (pointsComponent) {
    const particlesGeometry = new BufferGeometry()

    const count = stars.length
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const star = stars[i]
      const index = i * 3
      const phi = rightAscentionToAngle(star.RA)
      const theta = declinationToAngle(star.Dec)
      const cartesian = sphericalToCartesian(1, phi, theta)

      positions[index] = cartesian.x
      positions[index + 1] = cartesian.y
      positions[index + 2] = cartesian.z

      let value = parseFloat(star.V)

      if (value + 0.5 >= maxV) {
        colors[index] = 1
        colors[index + 1] = 0
        colors[index + 2] = 0
      } else {
        value = map(value, minV, maxV, 0, 1)
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

  const texture = loader.load([
    'sky/px.png',
    'sky/nx.png',
    'sky/py.png',
    'sky/ny.png',
    'sky/pz.png',
    'sky/nz.png',
  ])
  texture.magFilter = LinearFilter
  texture.minFilter = NearestFilter
  // const scene = sceneComponent.scene
  // scene.background = texture

  timer = setInterval(() => {
    angle += increment
    angle = angle % (Math.PI * 2)
    target.value.set(Math.sin(angle), 0, Math.cos(angle))
    angle2 += increment2
    angle2 = angle2 % (Math.PI * 2)
    target2.value.set(Math.cos(angle2), 0.2, Math.sin(angle2))
  }, 16)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
