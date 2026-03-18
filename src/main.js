import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { useCarritoStore } from '@/stores/carritoStore'
import { useAuthStore } from '@/stores/authStore.js'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 1. IMPORTAR ESTILOS DE Tailwind
import './assets/main.css' 

// 2. ESTILOS DE PRIMEVUE
import 'primevue/resources/themes/lara-dark-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
//
const pinia = createPinia()
// activar persistencia
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.mount('#app')   


//para que el carrito no se borre
const authStore = useAuthStore()
const carritoStore = useCarritoStore()

if (authStore.user) {
  carritoStore.cargarCarrito(authStore.user.id)
}




