<template>
  <Box
    :position="{ z: 1000 * -1 }"
    :rotation="{ x: Math.PI / 3, y: Math.PI / 3, z: Math.PI / 3 }"
    @click="clicked"
  >
    <LambertMaterial />
  </Box>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Intersection } from 'three'
import { Vector3 } from 'three'
import { Box, Group, LambertMaterial } from 'troisjs'

const router = useRouter()
const boxes = ref(null)

function clicked(e: { intersect: Intersection }) {
  router.push({
    name: 'Home',
  })
}
</script>
