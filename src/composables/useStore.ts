import { ComponentPublicInstance, reactive } from 'vue'

import { Vector3 } from 'three'
import { Renderer } from 'troisjs'

const startDate = new Date('1999-12-22T08:00').getTime()

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
  time: number
  startDate: number
  stopTime: boolean
  getStars: () => void
  onZoom: (value: number) => void
  toggleLines: () => void
  toggleConstellations: () => void
  toggleMassivePlanets: () => void
  toggleTrackSun: () => void
  toggleAlignEcliptic: () => void
  getTime: () => number
  toggleStopTime: () => void
}

// { x: Math.PI / 2 + (23.4 / 180) * Math.PI }
const store = reactive<Store>({
  texts: [],
  starsTexts: [],
  zoomValue: 1,
  showLines: false,
  sunRotation: 0,
  massivePlanets: false,
  showConstellations: true,
  trackSun: true,
  alignEcliptic: true,
  eclipticRotation: new Vector3((23.4 / 180) * Math.PI, 0, 0),
  time: startDate,
  stopTime: false,
  startDate,
  getTime: () => {
    const time = (store.time ?? startDate) as number
    const date = startDate

    return (time - date) / 31557600000 - 0.25
  },
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
  toggleStopTime: () => {
    store.stopTime = !store.stopTime
  },
})

export default function () {
  return store
}
