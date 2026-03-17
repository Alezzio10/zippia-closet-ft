import { createRouter, createWebHistory } from 'vue-router'
import ProductosView from '../views/ProductosView.vue'
import AdminUsers from "../views/AdminUsers.vue"
import CategoriasView from '../views/admin/CategoriasView.vue'
// import ProductosView from "../views/ProductosView.vue"
// import PedidosView from "../views/PedidosView.vue"
import Login from "../views/admin/Login.vue"
<<<<<<< HEAD
import CarritoView from '../views/CarritoView.vue'
=======
import PagoTarjeta from "../views/PagoTarjeta.vue"

>>>>>>> main

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      //ruta de login
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
    component: CategoriasView
    },

    {
      path: "/admin/users",
      name: "adminUsers",
      component: AdminUsers
    },
    // {
    // path: "/admin/productos",
    // component: ProductosView
    // },
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

export default router
