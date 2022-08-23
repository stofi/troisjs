import { ComponentPublicInstance, onMounted, ref } from 'vue'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as EC from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { Renderer, Scene } from 'troisjs'

import useCamera from '@/composables/useCamera'
import useScene from '@/composables/useScene'

const renderer = ref<THREE.WebGLRenderer>()
const controls = ref<OrbitControls>()
const scene = ref<THREE.Scene>()
const camera = ref<THREE.PerspectiveCamera>()
const composer = ref<EC.EffectComposer>()

export default function useRenderer() {
  const rendererRef = ref<ComponentPublicInstance<typeof Renderer>>()

  const enableEffect = ref(true)

  const { target, sceneRef } = useScene()

  const {
    setOnSetFov,
    cameraRef,
    onInput,
    inputValue,
    starsText,
    texts,
    // getStars,
  } = useCamera()

  onMounted(() => {
    const rendererComponent = rendererRef.value
    if (!rendererComponent) return
    renderer.value = rendererComponent.renderer as THREE.WebGLRenderer
    controls.value = rendererComponent.three.cameraCtrl as OrbitControls
    camera.value = rendererComponent.three.camera as THREE.PerspectiveCamera
    composer.value = rendererComponent.three.composer as EC.EffectComposer
    scene.value = rendererComponent.scene as THREE.Scene

    setOnSetFov(() => {
      if (!controls.value) return
      console.log('setOnSetFov', controls.value)

      controls.value.update()
    })
    // const offset = Math.PI / 360

    // controls.value.maxPolarAngle = Math.PI / 2 + offset
    // controls.value.minPolarAngle = Math.PI / 2 - offset
    // controls.value.minAzimuthAngle = 2 * Math.PI - offset
    // controls.value.maxAzimuthAngle = 2 * Math.PI + offset

    enableEffect.value = true
  })

  return {
    rendererRef,
    sceneRef,
    enableEffect,
    renderer,
    controls,
    camera,
    composer,
    target,
    cameraRef,
    onInput,
    inputValue,
    starsText,
    texts,
    // getStars,
  }
}
