<template>
  <nav class="zippia-azul text-white shadow-md">
    <!-- w-full para que ocupe todo el ancho y mover el boton de inicar sesion a la derecha-->
    
    <div class="w-full px-6 py-4 flex justify-between items-center">

      <h1 class="text-2xl font-bold">
        <button @click="$emit('toggleSidebar')" class="zippia-boton">
          ☰
        </button>
        Zippia Closet
      </h1>

      <router-link
        v-if="!authStore.isAuthenticated"
        to="/login"
        class="zippia-boton px-6 py-3 text-lg">
        Iniciar sesión
      </router-link>

      <div v-else class="flex gap-3">
        <router-link
          to="/carrito"
          class="zippia-boton px-4 py-2"
          :style="carritoStore.totalProductos > 0 ? 'background-color: orange;' : ''"
        >
          Carrito
        </router-link>

        <button
            class="zippia-boton px-4 py-2"
            @click="$emit('usuarioSidebarAbrir')">
            Usuario
        </button>
      </div>

    </div>

  </nav>
</template>


<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useCarritoStore } from "@/stores/carritoStore"

const authStore = useAuthStore()
const carritoStore = useCarritoStore()
</script>