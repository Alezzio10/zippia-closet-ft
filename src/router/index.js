import { createRouter, createWebHistory } from 'vue-router'
import ProductosView from '../views/ProductosView.vue'
import AdminUsers from "../views/AdminUsers.vue"
import CategoriasView from '../views/admin/CategoriasView.vue'
import AdminProductosView from '../views/admin/ProductosView.vue'
import AdminPedidosView from '../views/admin/PedidosView.vue'
// import ProductosView from "../views/ProductosView.vue"
// import PedidosView from "../views/PedidosView.vue"
import Login from "../views/admin/Login.vue"
import CarritoView from '../views/CarritoView.vue'
import PagoTarjeta from "../views/PagoTarjeta.vue"
import SeleccionarMetodoPago from "../views/SeleccionarMetodoPago.vue"
import { useAuthStore } from '../stores/authStore'
import register from "../views/Register.vue"
import Perfil from "@/views/Perfil.vue";
import MisPedidos from "@/views/MisPedidos.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // descripcion de producto
    
//     {
//   path: '/producto',
//   name: 'detalleProducto',
//   component: DetalleProducto
// },
      //ruta de login
        {
      path: '/register',
      name: 'register',
      component:register
    },
    {
        path: "/perfil",
        name: "Perfil",
        component: Perfil,
        meta: { requiresAuth: true } // protegida
       },
       {
        path: "/mis-pedidos",
        name: "MisPedidos",
        component: MisPedidos,
        meta: { requiresAuth: true }
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
    {
      path: "/admin/pedidos",
      name: "adminPedidos",
      meta: { requiresAdmin: true },
      component: AdminPedidosView,
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
      path: '/seleccionar-metodo-pago',
      name: 'seleccionarMetodoPago',
      component: SeleccionarMetodoPago,
      meta: { requiresAuth: true },
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
        path: '/detalle/:id',
        name: 'detalleProducto',
        component: () => import('@/views/DetalleProducto.vue')
      },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta?.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login' }
  }

  if (!to.meta?.requiresAdmin) return true
  if (!auth.isAuthenticated) return { path: '/login' }
  if (!auth.isAdmin) return { path: '/' }

  return true
})

export default router
