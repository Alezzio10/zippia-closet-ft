import { defineStore } from "pinia"

export const useCarritoStore = defineStore("carrito", {
  state: () => ({
    carrito: []
  }),
  persist: true,

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
    },

    eliminarDelCarrito(id) {
      this.carrito = this.carrito.filter(p => p.id !== id)
    },

    vaciarCarrito() {
      this.carrito = []
    },
    aumentarCantidad(id) {
        const item = this.carrito.find(p => p.id === id)
        if (item) {
            item.cantidad++
        }
    },

    disminuirCantidad(id) {
        const item = this.carrito.find(p => p.id === id)
        if (item && item.cantidad > 1) {
            item.cantidad--
        }
    }

    

  },

  getters: {

    totalProductos: (state) =>
      state.carrito.reduce((suma, p) => suma + p.cantidad, 0),

    precioTotal: (state) =>
      state.carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)

  }
})