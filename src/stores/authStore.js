import { defineStore } from 'pinia'
import api from '@/services/api'
import router from '@/router'
import { useCarritoStore } from "@/stores/carritoStore"


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),

  // Persistencia automática
  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.token,

    isAdmin: (state) => {
      // Soporta distintas formas de rol según backend:
      // - Spatie: user.roles[].name
      // - FK propia: user.rol_id (1 = admin)
      // - Relación: user.rol.nombre
      if (!state.user) return false
      if (state.user?.roles?.some(role => role?.name === 'ADMIN')) return true
      if (state.user?.rol?.nombre === 'ADMIN' || state.user?.rol?.nombre === 'Administrador') return true
      if (Number(state.user?.rol_id) === 1) return true
      return false
    },

    isVendedor: (state) => {
      return state.user?.roles?.some(role => role.name === 'VENDEDOR')
    },

    isCliente: (state) => {
      return state.user?.roles?.some(role => role.name === 'CLIENTE')
    }
  },

  actions: {

    async login(credentials) {
      try {
        const { data } = await api.post('/auth/login', credentials)

        this.token = data.access_token
        this.user = data.user

        const carritoStore = useCarritoStore()
        carritoStore.cargarCarrito(this.user.id)

        // Redirección según rol
        if (this.isAdmin) {
          router.push('/admin/users')
          return
        }

        router.push('/')

      } catch (error) {
        console.error('Error en login:', error)

        
          throw error; 
    }


    },

    async register(payload) {
      try {
        const { data } = await api.post('/auth/register', payload)

        this.token = data.access_token
        this.user = data.user

        const carritoStore = useCarritoStore()
        carritoStore.cargarCarrito(this.user.id)

        router.push('/')
      } catch (error) {
        console.error('Error en registro:', error)
        throw error
      }
    },

    async logout() {
      const carritoStore = useCarritoStore()
      try {
        if (this.token) {
          await api.post('/auth/logout')
        }
      } catch (error) {
        console.warn('Error al cerrar sesión:', error)
      } finally {
        carritoStore.vaciarCarrito()
        this.$reset()
        window.location.href = '/'
      }
    }
  }
})