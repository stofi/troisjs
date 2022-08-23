import {
  ComponentPublicInstance,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import { Vector3 } from 'three'
import { Camera } from 'troisjs'

import Stars from '../Stars'

export default function useCamera() {
  const cameraRef = ref<ComponentPublicInstance<typeof Camera>>()

  const focalLength = ref(2200)
  const minFocalLength = ref(1)
  const maxFocalLength = ref(10000)

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement

    let value = Number(target.value)
    inputValue.value = value
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

  const inputValue = ref(0)

  const setInput = (value: number) => {
    inputValue.value = Math.pow(value, 1 / 4)
  }
  setInput(focalLengthNormalized.value)

  const stars = new Stars()

  const hFov = computed(() => {
    const aspect = window.innerWidth / window.innerHeight
    const vFov = fov.value

    return vFov / aspect
  })

  const setFov = () => {
    const cameraComponent = cameraRef.value

    if (!cameraComponent) return
    const camera = cameraComponent.camera
    const v = fov.value
    camera.fov = v
    camera.updateProjectionMatrix()
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
  const starsText = ref('')

  const texts = computed(() => {
    const fl = `Focal length: ${focalLength.value.toFixed(0)}mm`
    const fovx = `FOV: ${fov.value.toFixed(2)}°`

    return [fl, fovx]
  })

  // const getStars = () => {
  //   const cameraComponent = cameraRef.value
  //   if (!cameraComponent) return
  //   const direction = new Vector3(0, 0, -1)
  //   const newV = new Vector3(direction.x, direction.y, -direction.z)

  //   const sph = Stars.cartesianToSpherical(newV)
  //   const h = hFov.value
  //   const v = fov.value
  //   const region = stars.getStarsInRegion(direction, v, h)
  //   const a = sph.ascention * (180 / Math.PI)
  //   const d = sph.declination * (180 / Math.PI)
  //   // console.log(region)

  //   starsText.value = region
  //     .map((star) => {
  //       const { N, RA, Dec } = star

  //       return `${N} ${RA} ${Dec}`
  //     })
  //     .join('\n')
  // }

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

  return {
    cameraRef,
    focalLength,
    minFocalLength,
    maxFocalLength,
    onInput,
    fov,
    focalLengthNormalized,
    inputValue,
    hFov,
    setFov,
    setFocalLenght,
    onScroll,
    onResize,
    stars,
    starsText,
    texts,
    setOnSetFov,
    // getStars,
  }
}
