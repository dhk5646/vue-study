import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tech-blog-post',
      component: () => import('@/views/TechBlogPost.vue')
    }
  ]
})

export default router
