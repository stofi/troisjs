import './assets/tailwind.css'

import { createApp } from 'vue'

import App from './App.vue'
import configureRouter from './router'

const app = createApp(App)
const router = configureRouter()

app.use(router)

// Object.values(import.meta.globEager('./modules/*.js')).map((i) =>
//   i.install?.({ app, isClient: true, router })
// )

app.mount('#app')

