<template>
  <aside
    :class="[
      'azul-raro-fondo text-black w-64 h-screen fixed z-30 top-0 right-0 shadow-lg transform transition-transform duration-300',
      open ? 'translate-x-0' : 'translate-x-full'
    ]"
  >
    <div class="p-4 border-b font-bold text-lg azul-raro-fondo">
      Usuario
    </div>

    <ul class="p-4 space-y-2" style="list-style-type: none;">
      <li class="p-2 rounded cursor-pointer hover:bg-[#6F7294]">
      <router-link 
        to="/perfil" 
        class="block w-full h-full text-inherit no-underline"
      >
        Perfil
      </router-link>
    </li>

      <li class="p-2 rounded cursor-pointer hover:bg-[#6F7294]">
        <router-link
          to="/mis-pedidos"
          class="block w-full h-full text-inherit no-underline"
        >
          Mis pedidos
        </router-link>
      </li>

      <li
        class="p-2 rounded cursor-pointer hover:bg-[#6F7294]"
        @click="authStore.logout()"
      >
        Cerrar sesión
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'
import { useAuthStore } from '@/stores/authStore'

defineProps({
  open: Boolean
})

const authStore = useAuthStore()
</script>