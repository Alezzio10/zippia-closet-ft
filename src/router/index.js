import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductosView.vue'
import AdminUsers from "../views/AdminUsers.vue"
import Login from "../views/admin/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      //ruta de login
       {
      path: '/login',
      name: 'login',
      component:Login
    },
  //  {
  //   path: "/",
  //   redirect: "/admin/users"
  // },

  {
    path: "/admin/users",
    name: "adminUsers",
    component: AdminUsers
  },
    {
      path: '/',
      name: 'home',
      component: ProductosView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
