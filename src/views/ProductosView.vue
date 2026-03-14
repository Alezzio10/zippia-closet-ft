<template>
  <Navegacionbarra @toggleSidebar="toggleSidebar"/>

  <!-- div transparente para cerrar las categorias -->
  <div
    v-if="sidebarOpen"
    class="fixed inset-0 z-20"
    style="background-color: rgba(0, 0, 0, 30%);"
    @click="toggleSidebar">
</div>
  <SidebarCategorias :open="sidebarOpen" :toggleSidebar="toggleSidebar" />

  <div class="p-6 flex">
    <!-- Espacio para filtros -->
    <div class="w-1/4 mr-6" style="color: black;">
      FALTAN FILTROS
    </div>

    <!-- Grid de productos -->
    <div class="w-3/4">
      <div class="grid grid-cols-6 gap-6">
        <ProductoCard
          v-for="producto in store.productos"
          :key="producto.id"
          :producto="producto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useProductoStore } from '@/stores/productoStore'
import ProductoCard from '@/components/ProductoCard.vue'
import Navegacionbarra from "@/components/layouts/Navegacionbarra.vue"
import SidebarCategorias from '@/components/SidebarCategorias.vue'

const store = useProductoStore()
const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value}

onMounted(() => {
  store.obtenerProductos()
})

</script>