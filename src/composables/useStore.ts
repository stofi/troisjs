import { ComponentPublicInstance, reactive } from 'vue'

import { Vector3 } from 'three'
import { Renderer } from 'troisjs'

interface Store {
  texts: string[]
  starsTexts: string[]
  zoomValue: number
  showLines: boolean
  sunRotation: number
  eclipticRotation: Vector3
  massivePlanets: boolean
  trackSun: boolean
  showConstellations: boolean
  alignEcliptic: boolean
  renderer?: ComponentPublicInstance<typeof Renderer>
  getStars: () => void
  onZoom: (value: number) => void
  toggleLines: () => void
  toggleConstellations: () => void
  toggleMassivePlanets: () => void
  toggleTrackSun: () => void
  toggleAlignEcliptic: () => void
}

// { x: Math.PI / 2 + (23.4 / 180) * Math.PI }
const store = reactive<Store>({
  texts: [],
  starsTexts: [],
  zoomValue: 1,
  showLines: false,
  sunRotation: 0,
  massivePlanets: true,
  showConstellations: true,
  trackSun: true,
  alignEcliptic: true,
  eclipticRotation: new Vector3((23.4 / 180) * Math.PI, 0, 0),
  getStars: () => {
    //
  },
  onZoom: (value: number) => {
    //
  },
  toggleLines: () => {
    store.showLines = !store.showLines
  },
  toggleConstellations: () => {
    store.showConstellations = !store.showConstellations
  },
  toggleMassivePlanets: () => {
    store.massivePlanets = !store.massivePlanets
  },
  toggleTrackSun: () => {
    store.trackSun = !store.trackSun
  },
  toggleAlignEcliptic: () => {
    store.alignEcliptic = !store.alignEcliptic
  },
})

export default function () {
  return store
}
