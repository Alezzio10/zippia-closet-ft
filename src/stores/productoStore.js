import { defineStore } from 'pinia'
import api from '@/services/api'

export const useProductoStore = defineStore('productos', {
  state: () => ({
    productos: []
  }),

  actions: {
    async obtenerProductos() {

      const res = await api.get('/productos')
      
      
      

      this.productos = res.data.productos
      console.log(res.data)
      
    }
  }
})