<template>
  <Points ref="pointsRef" :scale="{ x: -1 }" :rotation="{ y: Math.PI }">
    <ShaderMaterial
      :props="{
        ...StarShader,
        size: props.size,
        sizeAttenuation: false,
        vertexColors: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }"
    ></ShaderMaterial>
  </Points>
  <Sphere
    ref="constellationRef"
    :radius="10"
    :scale="{ x: -1 }"
    :rotation="{ y: Math.PI }"
    :width-segments="256"
    :height-segments="256"
  >
    <ShaderMaterial
      :props="{ ...ConstellationShader, side: 2, transparent: true }"
    >
    </ShaderMaterial>
  </Sphere>
</template>

<script lang="ts" setup>
import {
  ComponentPublicInstance,
  defineProps,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  TextureLoader,
} from 'three'
import {
  BasicMaterial,
  Points,
  PointsMaterial,
  ShaderMaterial,
  Sphere,
  Texture,
} from 'troisjs'

import ConstellationShader from '@/shaders/ConstellationShader'
import StarShader from '@/shaders/StarShader'
import Stars from '@/Stars'
import { map } from '@/utils'

const loader = new TextureLoader()

const props = defineProps({
  size: {
    type: Number,
    default: 3,
  },
  constellationOpacity: {
    type: Number,
    default: 0,
  },
})

const pointsRef = ref<ComponentPublicInstance<typeof Points>>()
const constellationRef = ref<ComponentPublicInstance<typeof Sphere>>()

const stars = new Stars()

const blackbodyTexture = loader.load('/blackbody_1px.png')
const constellationTexture = loader.load('/constellation_figures_4k.png')

watch(
  props,
  () => {
    const pointsComponent = pointsRef.value
    const constellationComponent = constellationRef.value

    if (pointsComponent) {
      pointsComponent.material.uniforms.uSize.value = props.size
    }

    if (constellationComponent) {
      constellationComponent.material.uniforms.uOpacity.value =
        props.constellationOpacity
    }
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  const pointsComponent = pointsRef.value
  const constellationComponent = constellationRef.value

  if (pointsComponent) {
    const particlesGeometry = new BufferGeometry()

    const count = stars.count
    const positions = new Float32Array(count * 3)
    const magnitude = new Float32Array(count)
    const temperature = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const star = stars.getStarAt(i)
      const index = i * 3

      positions[index] = star.cartesian.x
      positions[index + 1] = star.cartesian.y
      positions[index + 2] = star.cartesian.z

      let value = parseFloat(star.V)

      value = map(value, stars.minV, stars.maxV, 0, 1)
      magnitude[i] = value * 0.5 + 0.5
      let temp = star.K ? parseInt(star.K) : 1000

      temp = map(temp, Stars.minTemperature, Stars.maxTemperature, 0, 1)

      temperature[i] = Math.pow(temp, 1 / 4)
    }

    particlesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )

    particlesGeometry.setAttribute(
      'magnitude',
      new BufferAttribute(magnitude, 1)
    )

    particlesGeometry.setAttribute(
      'temperature',
      new BufferAttribute(temperature, 1)
    )

    pointsComponent.setGeometry(particlesGeometry)

    pointsComponent.material.uniforms.tBlackBody.value = blackbodyTexture

    pointsComponent.material.uniforms.uMinTemperature.value =
      Stars.minTemperature

    pointsComponent.material.uniforms.uMaxTemperature.value =
      Stars.maxTemperature

    pointsComponent.material.uniforms.uMinValue.value = stars.minV

    pointsComponent.material.uniforms.uMaxValue.value = stars.maxV

    pointsComponent.material.uniforms.uSize.value = props.size
  }

  if (constellationComponent) {
    constellationComponent.material.uniforms.uTexture.value =
      constellationTexture

    constellationComponent.material.uniforms.uOpacity.value =
      props.constellationOpacity
  }
})
</script>
