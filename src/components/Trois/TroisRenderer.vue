<template>
  <Renderer
  ref="rendererRef"
alpha resize="window" :params="{
    logarithmicDepthBuffer: true,
  }" :orbit-ctrl="{
  enableZoom: false,
}">
    <slot></slot>
    <EffectComposer >
      <RenderPass />
      <SkyPass v-if="composer && renderer && camera && enableEffect" ref="skyPassRef" :camera="camera" :composer="composer" :renderer="renderer" />
    </EffectComposer>
  </Renderer>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, onMounted, ref } from 'vue';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as EC from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {
  EffectComposer, Renderer, RenderPass,
} from 'troisjs';

import SkyPass from '../Effects/SkyPass';

const rendererRef = ref<ComponentPublicInstance<typeof Renderer>>();
const skyPassRef = ref<ComponentPublicInstance<typeof SkyPass>>();


const enableEffect = ref (false);

const renderer = ref <THREE.WebGLRenderer>();
const controls = ref <OrbitControls>();
const camera = ref <THREE.PerspectiveCamera>();
const composer = ref <EC.EffectComposer>();


onMounted(() => {
  const rendererComponent = rendererRef.value;
  if (!rendererComponent)
    return;
  renderer.value = rendererComponent.renderer as THREE.WebGLRenderer
  controls.value = rendererComponent.three.cameraCtrl as OrbitControls;
  camera.value = rendererComponent.three.camera as THREE.PerspectiveCamera;
  composer.value = rendererComponent.three.composer as EC.EffectComposer;

  rendererComponent.onBeforeRender(() => {
      if(!skyPassRef.value ) return;
        skyPassRef.value.update()
    });
  
  
  

  controls.value.enableZoom = false;
  controls.value.enableRotate = true;
  controls.value.enablePan = false;
  controls.value.rotateSpeed = 0.025;
  controls.value.enableDamping = true;
  enableEffect.value = true;


});
</script>