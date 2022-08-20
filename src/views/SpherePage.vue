<template>
  <Sphere
    ref="sphere"
    :rotation="{ y: -Math.PI / 2 }"
    :radius="1737.5"
    :position="{ z: 384400 * -1 }"
    :width-segments="256"
    :height-segments="256"
    @click="clicked"
  >
    <StandardMaterial :props="{ displacementScale: 10 }">
      <Texture src="/color.jpg" />
      <Texture src="/bump.jpg" name="displacementMap" />
    </StandardMaterial>
  </Sphere>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import type { Intersection } from 'three'
import { Sphere, StandardMaterial, Texture } from 'troisjs'

const router = useRouter()

function clicked(e: { intersect: Intersection }) {
  // console.log(e.intersect);
  // router.push({
  //   name: 'Home',
  // });
}
</script>
