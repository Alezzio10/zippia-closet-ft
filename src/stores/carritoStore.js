import { defineStore } from "pinia"
import { useAuthStore } from "@/stores/authStore"

export const useCarritoStore = defineStore("carrito", {
  state: () => ({
    carrito: []
  }),
  // persist: true,

  actions: {
    _normalizarTalla(talla) {
      return talla || null
    },

    _buscarItem(id, talla = null) {
      const tallaNormalizada = this._normalizarTalla(talla)
      return this.carrito.find(
        p => p.id === id && this._normalizarTalla(p.tallaSeleccionada) === tallaNormalizada
      )
    },

    agregarAlCarrito(producto, talla = null) {
      const tallaNormalizada = this._normalizarTalla(talla)
      const item = this._buscarItem(producto.id, tallaNormalizada)

      if (item) {
        item.cantidad++
      } else {
        this.carrito.push({
          ...producto,
          cantidad: 1,
          tallaSeleccionada: tallaNormalizada
        })
      }
      const authStore = useAuthStore()
      if (authStore.user) {
        this.guardarCarrito(authStore.user.id)
      }
    },

    eliminarDelCarrito(id, talla = null) {
      const tallaNormalizada = this._normalizarTalla(talla)
      this.carrito = this.carrito.filter(
        p => !(p.id === id && this._normalizarTalla(p.tallaSeleccionada) === tallaNormalizada)
      )

      const authStore = useAuthStore()
      if (authStore.user) {
        this.guardarCarrito(authStore.user.id)
      }
    },

    aumentarCantidad(id, talla = null) {
        const item = this._buscarItem(id, talla)
        if (item) {
            item.cantidad++
        }

        const authStore = useAuthStore()
      if (authStore.user) {
        this.guardarCarrito(authStore.user.id)
      }
    },

    disminuirCantidad(id, talla = null) {
        const item = this._buscarItem(id, talla)
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