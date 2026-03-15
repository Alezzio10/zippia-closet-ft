<template>
  <Navegacionbarra @toggleSidebar="toggleSidebar"/>

  <!-- div transparente para cerrar las categorias -->
  <div
    v-if="sidebarOpen"
    class="fixed inset-0 z-20"
    style="background-color: rgba(0, 0, 0, 30%);"
    @click="toggleSidebar">
</div>
  <SidebarCategorias :open="sidebarOpen" :toggleSidebar="toggleSidebar" @filtrarCategoria="filtrarCategoria"/>

  <div class="p-6 flex">
    <!-- espacio de filtros -->
    <div class="w-1/4 mr-6" style="color: black;">
      <input v-model="busqueda" type="text" placeholder="Buscar producto..." class="w-full p-2 border rounded azul-raro-fondo"/>
      <br>
      <br>
      <br>
      <div class="azul-raro-fondo"> 
        <label style="font-weight: bold;">Precio máximo: ${{ precioMax }}</label> 
        <input v-model.number="precioMax" type="range" min="0" max="999" class="w-full " style="accent-color: #484A68;"/> 
      </div>
      <div>
        <br>
        <br>
        <div>
          <label>Marca</label>
        <select v-model="marcaSeleccionada" class="w-full p-2 border rounded azul-raro-fondo" style="font-weight: 900; color: black;">
          <option value="" style="font-weight: 900; color: black;">Todas</option>
          <option v-for="marca in marcasDisponibles" :key="marca" :value="marca" style="font-weight: 900; color: black;">{{ marca }}</option>
        </select>

        </div>
        
      </div>  
     
    </div>

    <!-- Grid de productos -->
    <div class="w-3/4">
      <div class="grid grid-cols-6 gap-6">
        <ProductoCard
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :producto="producto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useProductoStore } from '@/stores/productoStore'
import ProductoCard from '@/components/ProductoCard.vue'
import Navegacionbarra from "@/components/layouts/Navegacionbarra.vue"
import SidebarCategorias from '@/components/SidebarCategorias.vue'

const store = useProductoStore()
const sidebarOpen = ref(false)


const categoriaSeleccionada = ref(null)
const busqueda = ref('')
const precioMax = ref(999)
const marcaSeleccionada = ref('')

const marcasDisponibles = computed(() => {
  return [...new Set(
    store.productos.map(producto => producto.marca?.nombre_marca).filter(Boolean)
  )]
})

const filtrarCategoria = (categoria) => {
  categoriaSeleccionada.value = categoria
}
const productosFiltrados = computed(() => {

  let productos = store.productos

  if (categoriaSeleccionada.value) {
    productos = productos.filter(
      producto => producto.categoria?.nombre_categoria === categoriaSeleccionada.value
    )
  }

  if (busqueda.value) {
    productos = productos.filter(
      producto => producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  }
  productos = productos.filter(
  producto => producto.precio <= precioMax.value
)
  if (marcaSeleccionada.value) {
    productos = productos.filter(
      producto => producto.marca?.nombre_marca === marcaSeleccionada.value
    )
  }

  return productos})


const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value}

onMounted(() => {
  store.obtenerProductos()
})

</script>