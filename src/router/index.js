import { createRouter, createWebHistory } from 'vue-router'
import ProductosView from '../views/ProductosView.vue'
import AdminUsers from "../views/AdminUsers.vue"
import CategoriasView from '../views/admin/CategoriasView.vue'
import AdminProductosView from '../views/admin/ProductosView.vue'
// import ProductosView from "../views/ProductosView.vue"
// import PedidosView from "../views/PedidosView.vue"
import Login from "../views/admin/Login.vue"
import CarritoView from '../views/CarritoView.vue'
import PagoTarjeta from "../views/PagoTarjeta.vue"
import { useAuthStore } from '../stores/authStore'
import register from "../views/Register.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      //ruta de login
        {
      path: '/register',
      name: 'register',
      component:register
    },

       {
      path: '/login',
      name: 'login',
      component:Login
    },

    //ruta del carrito
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoView
    },
  //  {
  //   path: "/",
  //   redirect: "/admin/users"
  // },
      {
    path: '/admin/categorias',
    name: 'categorias',
    meta: { requiresAdmin: true },
    component: CategoriasView
    },

    {
      path: "/admin/users",
      name: "adminUsers",
      meta: { requiresAdmin: true },
      component: AdminUsers
    },
    {
      path: "/admin/productos",
      name: "adminProductos",
      meta: { requiresAdmin: true },
      component: AdminProductosView
    },
    // {
    // path: "/admin/pedidos",
    // component: PedidosView
    // },
    {
      path: '/',
      name: 'home',
      component: ProductosView,
    },
    {
      path: '/pago-tarjeta',
      name: 'pagoTarjeta',
      component: PagoTarjeta,
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

router.beforeEach((to) => {
  if (!to.meta?.requiresAdmin) return true

  const auth = useAuthStore()
  if (!auth.isAuthenticated) return { path: '/login' }
  if (!auth.isAdmin) return { path: '/' }

  return true
})

export default router
