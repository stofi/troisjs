import { ComponentPublicInstance, onMounted, ref } from 'vue'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as EC from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { Renderer, Scene } from 'troisjs'

import useCamera from '@/composables/useCamera'
import useScene from '@/composables/useScene'
import useStore from '@/composables/useStore'

const renderer = ref<THREE.WebGLRenderer>()
const controls = ref<OrbitControls>()
const scene = ref<THREE.Scene>()
const camera = ref<THREE.PerspectiveCamera>()
const composer = ref<EC.EffectComposer>()

export default function useRenderer() {
  const store = useStore()
  const rendererRef = ref<ComponentPublicInstance<typeof Renderer>>()

  const enableEffect = ref(true)

  const { target, sceneRef } = useScene()

  const {
    setOnSetFov,
    cameraRef,
    onInput,
    zoomValue,
    starsTexts,
    texts,
    getStars,
    onBeforeRender: cameraOnBeforeRender,
  } = useCamera()

  store.getStars = getStars
  store.onZoom = onInput

  onMounted(() => {
    const rendererComponent = rendererRef.value
    if (!rendererComponent) return
    renderer.value = rendererComponent.renderer as THREE.WebGLRenderer
    controls.value = rendererComponent.three.cameraCtrl as OrbitControls
    camera.value = rendererComponent.three.camera as THREE.PerspectiveCamera
    composer.value = rendererComponent.three.composer as EC.EffectComposer
    scene.value = rendererComponent.scene as THREE.Scene
    store.renderer = rendererComponent

    rendererComponent.onBeforeRender(() => {
      const cameraComponent = cameraRef.value

      if (!cameraComponent) return
      if (!controls.value) return
      const camera = cameraComponent.camera

      camera.updateProjectionMatrix()

      cameraOnBeforeRender()

      store.texts = texts.value
      store.starsTexts = starsTexts.value
      store.zoomValue = zoomValue.value
    })

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
    zoomValue,
    starsTexts,
    texts,
    getStars,
  }
}
