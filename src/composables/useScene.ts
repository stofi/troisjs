import { ComponentPublicInstance, onBeforeUnmount, onMounted, ref } from 'vue'

import { Color, Vector3 } from 'three'
import { Scene } from 'troisjs'

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
    scene.background = new Color(0)

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
