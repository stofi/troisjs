import { reactive } from 'vue'

interface Store {
  texts: string[]
  starsTexts: string[]
  zoomValue: number
  showLines: boolean
  getStars: () => void
  onZoom: (value: number) => void
  toggleLines: () => void
}

const store = reactive<Store>({
  texts: [],
  starsTexts: [],
  zoomValue: 1,
  showLines: false,
  getStars: () => {
    //
  },
  onZoom: (value: number) => {
    //
  },
  toggleLines: () => {
    store.showLines = !store.showLines
  },
})

export default function () {
  return store
}
