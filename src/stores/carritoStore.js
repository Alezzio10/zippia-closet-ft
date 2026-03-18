import { defineStore } from "pinia"
import { useAuthStore } from "@/stores/authStore"

export const useCarritoStore = defineStore("carrito", {
  state: () => ({
    carrito: []
  }),
  // persist: true,

  actions: {

    agregarAlCarrito(producto) {
      const item = this.carrito.find(p => p.id === producto.id)

      if (item) {
        item.cantidad++
      } else {
        this.carrito.push({
          ...producto,
          cantidad: 1
        })
      }
      const authStore = useAuthStore()
      if (authStore.user) {
        this.guardarCarrito(authStore.user.id)
      }
    },

    eliminarDelCarrito(id) {
      this.carrito = this.carrito.filter(p => p.id !== id)

      const authStore = useAuthStore()
      if (authStore.user) {
        this.guardarCarrito(authStore.user.id)
      }
    },

    aumentarCantidad(id) {
        const item = this.carrito.find(p => p.id === id)
        if (item) {
            item.cantidad++
        }

        const authStore = useAuthStore()
      if (authStore.user) {
        this.guardarCarrito(authStore.user.id)
      }
    },

    disminuirCantidad(id) {
        const item = this.carrito.find(p => p.id === id)
        if (item && item.cantidad > 1) {
            item.cantidad--
        }

        const authStore = useAuthStore()
        if (authStore.user) {
          this.guardarCarrito(authStore.user.id)
        }
    },
    cargarCarrito(userId) {
      const data = localStorage.getItem(`carrito_${userId}`)
      this.carrito = data ? JSON.parse(data) : []
    },

    guardarCarrito(userId) {
      localStorage.setItem(`carrito_${userId}`, JSON.stringify(this.carrito))
    },

    vaciarCarrito() {
      this.carrito = []
    }

    

  },

  getters: {

    totalProductos: (state) =>
      state.carrito.reduce((suma, p) => suma + p.cantidad, 0),

    precioTotal: (state) =>
      state.carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)

  }
})