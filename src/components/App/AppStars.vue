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
</template>

<script lang="ts" setup>
import {} from 'vue'

import { AdditiveBlending, Intersection } from 'three'
import { Points, ShaderMaterial, Sphere } from 'troisjs'

import useStars from '@/composables/useStars'
import ConstellationShader from '@/shaders/ConstellationShader'
import StarShader from '@/shaders/StarShader'
import Stars from '@/Stars'

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

const onClick = (e: { intersect: Intersection }) => {
  const point = e.intersect.point

  const { ascention, declination } = Stars.cartesianToSpherical(
    point.normalize()
  )

  console.log(
    stars.getClosestStar({
      phi: Math.PI * 2 + ascention - Math.PI / 2,
      theta: declination,
    })
  )
}
</script>
