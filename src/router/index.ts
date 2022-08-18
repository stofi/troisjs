import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomePage.vue'

const configureRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/sphere',
        name: 'Sphere',
        component: () => import('../views/SpherePage.vue'),
      }
    ],
  })

  return router
}

export default configureRouter
