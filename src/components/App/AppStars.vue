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
    @click="onClick"
  >
    <ShaderMaterial
      :props="{ ...ConstellationShader, side: 2, transparent: true }"
    >
    </ShaderMaterial>
  </Sphere>
  <Group :rotation="{ y: ringRotationY }">
    <Group :rotation="{ x: -ringRotationX }">
      <Ring
        :visible="showRing"
        :inner-radius="0.3"
        :outer-radius="0.31"
        :position="{ x: 0, y: 0, z: 20 }"
        :theta-segments="64"
        @click="onClick"
      >
        <BasicMaterial color="white" :props="{ side: 2 }"></BasicMaterial>
      </Ring>
      <Plane
        ref="planeRef"
        :width="0.75"
        :height="0.75"
        :position="{ x: 0, y: -0.75, z: 20 }"
        :rotation="{ x: 0, y: Math.PI, z: 0 }"
      >
        <ShaderMaterial
          :props="{ ...StarLabel, side: 2, transparent: true }"
        ></ShaderMaterial>
      </Plane>
    </Group>
  </Group>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, computed, onMounted, ref } from 'vue'

import { AdditiveBlending, Intersection, Texture, Vector3 } from 'three'
import {
  BasicMaterial,
  Group,
  Plane,
  Points,
  Ring,
  ShaderMaterial,
  Sphere,
} from 'troisjs'

import useStars from '@/composables/useStars'
import ConstellationShader from '@/shaders/ConstellationShader'
import StarLabel from '@/shaders/StarLabel'
import StarShader from '@/shaders/StarShader'
import Stars from '@/Stars'
import { map } from '@/utils'

const stars = new Stars()

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
const { pointsRef, constellationRef } = useStars(props)

const planeRef = ref<ComponentPublicInstance<typeof Plane>>()

const ringRotationY = ref(Math.PI)
const ringRotationX = ref(0)

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const texture = new Texture(canvas)
canvas.width = 512
canvas.height = 512

onMounted(() => {
  if (!planeRef.value) return
  planeRef.value.material.uniforms.uTexture.value = texture
})

const onClick = (e: { intersect: Intersection }) => {
  const point = e.intersect.point

  const { ascention, declination } = Stars.cartesianToSpherical(
    point.normalize()
  )

  const closest = stars.getClosestStar({
    phi: Math.PI * 2 + ascention - Math.PI / 2,
    theta: declination,
  })

  if (closest) {
    ringRotationY.value = closest.phi + Math.PI / 2
    ringRotationX.value = closest.theta

    if (context && planeRef.value) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const name = closest.N ?? '' + `(${closest.HR})`
      const constellation = closest.C ?? 'N/A'
      const ascention = closest.RA
      const declination = closest.Dec

      //       const text = `Star: ${name}
      // Constellation: ${constellation}
      // Ascention: ${ascention}
      // Declination: ${declination}`
      // set fill to white
      context.fillStyle = 'white'
      context.textAlign = 'center'
      context.textBaseline = 'top'
      context.textAlign = 'left'
      context.font = '32px "3270"'
      context.fillText('Star:', 0, 0)
      context.fillText('Constellation:', 0, 35)
      context.fillText('Ascention:', 0, 75)
      context.fillText('Declination:', 0, 115)
      context.textAlign = 'right'
      context.fillText(name, canvas.width - 10, 0)
      context.fillText(constellation, canvas.width - 10, 35)
      context.fillText(ascention, canvas.width - 10, 75)
      context.fillText(declination, canvas.width - 10, 115)

      // update texture
      texture.needsUpdate = true
    }
  }
}

const showRing = ref(true)
</script>
