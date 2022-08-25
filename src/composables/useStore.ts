import { reactive } from 'vue'

interface Store {
  texts: string[]
  starsTexts: string[]
  zoomValue: number
  getStars: () => void
  onZoom: (value: number) => void
}

const store = reactive<Store>({
  texts: [],
  starsTexts: [],
  zoomValue: 1,
  getStars: () => {
    //
  },
  onZoom: (value: number) => {
    //
  },
})

export default function () {
  return store
}
