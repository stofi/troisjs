<template>
  <Scene ref="sceneRef" >
    <DirectionalLight :target="target" />
    <slot></slot>

  </Scene>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onBeforeUnmount, onMounted, ref } from 'vue';

import { CubeTextureLoader, LinearFilter, NearestFilter , Vector3 } from 'three';
import { DirectionalLight, Scene } from 'troisjs';

const loader = new CubeTextureLoader();

const sceneRef = ref<ComponentPublicInstance<typeof Scene>>();

let timer: ReturnType<typeof setInterval>; 

const target = ref<Vector3>(new Vector3(0, 0, -1));
let angle = 0
const increment = -.03

onMounted(() => {
  const sceneComponent = sceneRef.value;
  if (!sceneComponent)
    return;


  const texture = loader.load([
    'sky/px.png',
    'sky/nx.png',
    'sky/py.png',
    'sky/ny.png',
    'sky/pz.png',
    'sky/nz.png',
  ]);
  texture.magFilter = LinearFilter;
  texture.minFilter = NearestFilter;
  const scene = sceneComponent.scene;
  scene.background = texture;

  timer = setInterval(() => {
    angle += increment;
    angle = angle % (Math.PI * 2);
    target.value.set(Math.sin(angle), 0, Math.cos(angle));
  }, 16);

});
</script>