<template>
  <TroisRenderer>
    <TroisCamera />
    <TroisScene>
      <router-view />
    </TroisScene>
  </TroisRenderer>
</template>

<script lang="ts" setup>
import TroisCamera from './components/Trois/TroisCamera.vue'
import TroisRenderer from './components/Trois/TroisRenderer.vue'
import TroisScene from './components/Trois/TroisScene.vue'
import useDarkmode from './use/Darkmode'

useDarkmode()
</script>
