import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import FoodItems from '../views/FoodItem.vue'
import Review from '../views/Review.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/food-list',
      name: 'FoodItems',
      component: FoodItems,
    },
    {
      path: '/review',
      name: 'Review',
      component: Review,
    },
  ],
})

export default router
