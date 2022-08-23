import { ComponentPublicInstance, onBeforeUnmount, onMounted, ref } from 'vue'

import { TextureLoader, Vector3 } from 'three'
import * as THREE from 'three'
import { Scene } from 'troisjs'

const loader = new TextureLoader()

export default function useScene() {
  const sceneRef = ref<ComponentPublicInstance<typeof Scene>>()
  let timer: ReturnType<typeof setInterval>

  const target = ref<Vector3>(new Vector3(0, 0, -1))
  const angle = ref(0)
  const increment = -0.005

  onMounted(() => {
    const sceneComponent = sceneRef.value
    if (!sceneComponent) return

    const scene = sceneComponent.scene
    const texture = loader.load('/constellation_figures_2k.jpg')
    texture.mapping = THREE.EquirectangularRefractionMapping

    scene.background = texture

    timer = setInterval(() => {
      angle.value += increment
      angle.value = angle.value % (Math.PI * 2)
      target.value.set(Math.sin(angle.value), 0, Math.cos(angle.value))
    }, 16)
  })

  onBeforeUnmount(() => {
    clearInterval(timer)
  })

  return {
    sceneRef,
    target,
    angle,
    increment,
  }
}
