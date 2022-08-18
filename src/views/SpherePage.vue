<template>
  <Sphere
ref="sphere" :rotation="{ y: -Math.PI / 2 }" :radius="1737.5"
    :position="{ z: 384400 * -1 }" :width-segments="64" :height-segments="64" @click="clicked">

    <StandardMaterial>
      <Texture src="/color.jpg" />
      <Texture src="/bump.jpg" name="bumpMap" />
    </StandardMaterial>
  </Sphere>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import type { Intersection } from 'three'
import { Sphere, StandardMaterial, Texture } from 'troisjs';

const router = useRouter();


function clicked(e: { intersect: Intersection }) {
  // console.log(e.intersect);
  // router.push({
  //   name: 'Home',
  // });
}


</script>