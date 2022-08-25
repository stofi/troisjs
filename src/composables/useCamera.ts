import {
  ComponentPublicInstance,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import { Vector3 } from 'three'
import { Camera } from 'troisjs'

import type { StarTransformed } from '@/Stars'
import Stars from '@/Stars'

export default function useCamera() {
  const cameraRef = ref<ComponentPublicInstance<typeof Camera>>()

  const focalLength = ref(2200)
  const minFocalLength = ref(1)
  const maxFocalLength = ref(10000)

  const onInput = (event: number) => {
    let value = event
    zoomValue.value = value
    value = Math.pow(value, 4)

    value =
      value * (maxFocalLength.value - minFocalLength.value) +
      minFocalLength.value
    setFocalLenght(value)
    setFov()
  }

  let onSetFov = () => {
    //
  }

  const setOnSetFov = (fn: () => void) => {
    onSetFov = fn
  }

  const fov = computed(() => {
    // const a = window.innerWidth / 2
    const a = 24
    const b = focalLength.value

    return Math.atan(a / b) * (180 / Math.PI)
  })

  const focalLengthNormalized = computed(() => {
    return (
      (focalLength.value - minFocalLength.value) /
      (maxFocalLength.value - minFocalLength.value)
    )
  })

  const zoomValue = ref(0)

  const setInput = (value: number) => {
    zoomValue.value = Math.pow(value, 1 / 4)
  }
  setInput(focalLengthNormalized.value)

  const stars = new Stars()

  const fovVector = new Vector3(0, 0, -1)

  const setFov = () => {
    const cameraComponent = cameraRef.value

    if (!cameraComponent) return
    const camera = cameraComponent.camera

    const direction = camera.getWorldDirection(fovVector)

    camera.fov = fov.value

    // camera.rotation.set(0, 0, 0)

    setInput(focalLengthNormalized.value)
    onSetFov()
  }

  const setFocalLenght = (value: number) => {
    focalLength.value = Math.max(
      minFocalLength.value,
      Math.min(maxFocalLength.value, value)
    )
  }

  const onScroll = (e: WheelEvent) => {
    // get direction of scroll
    const direction = Math.sign(e.deltaY)
    // is shift key pressed?
    const shift = e.shiftKey

    const normalizedValue =
      (focalLength.value - minFocalLength.value) /
      (maxFocalLength.value - minFocalLength.value)

    const scale = shift ? 50 : 1000

    const newValue = focalLength.value + direction * normalizedValue * scale

    setFocalLenght(newValue)
    setFov()
  }

  const onResize = () => {
    setFov()
  }
  const starsTexts = ref<string[]>([])

  const texts = computed(() => {
    const fl = `Focal length: ${focalLength.value.toFixed(0)}mm`
    const fovx = `FOV: ${fov.value.toFixed(2)}°`

    return [fl, fovx]
  })
  const vector = new Vector3(0, 0, -1)
  let cameraDirection = vector.clone()

  const getStars = () => {
    const cameraComponent = cameraRef.value
    if (!cameraComponent) return

    const aspect = window.innerWidth / window.innerHeight
    const v = fov.value
    const h = v / aspect
    const region = stars.getStarsInRegion(cameraDirection, v, h, true)
    const uniqueNames: string[] = []

    starsTexts.value = region
      .reduce((acc, starX) => {
        const star = { ...starX }
        if (!star || !star.N) return acc

        if (uniqueNames.includes(star.N)) {
          const saved = acc.find((s) => s.N === star.N)
          if (saved) saved.count++

          return acc
        }
        uniqueNames.push(star.N)

        return [...acc, star]
      }, [] as StarTransformed[])
      .map((star) => {
        const { N, RA, Dec, B, C, count } = star

        //start emoji
        const name = `${N ? N : '*'}${count > 1 ? ` (${count})` : ''}\t\t:\t${
          C ? C : ' '
        }\t${B ? B : ' '}`

        return name
      })
  }

  onMounted(() => {
    const cameraComponent = cameraRef.value
    if (!cameraComponent) return
    const camera = cameraComponent.camera

    camera.near = 1e-6
    camera.far = 1e27
    setFov()

    window.addEventListener('wheel', onScroll)
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('wheel', onScroll)
    window.removeEventListener('resize', onResize)
  })

  const onBeforeRender = () => {
    const cameraComponent = cameraRef.value
    if (!cameraComponent) return
    const direction = vector
    cameraDirection = cameraComponent.camera.getWorldDirection(direction)
    cameraDirection.applyAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2)
  }

  return {
    cameraRef,
    focalLength,
    minFocalLength,
    maxFocalLength,
    onInput,
    fov,
    focalLengthNormalized,
    zoomValue,

    setFov,
    setFocalLenght,
    onScroll,
    onResize,
    stars,
    starsTexts,
    texts,
    setOnSetFov,
    getStars,
    onBeforeRender,
  }
}
