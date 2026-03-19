<template>
  <Navegacionbarra 
  @toggleSidebar="toggleSidebar" 
  @usuarioSidebarAbrir="usuarioSidebarAbrir" 
/>

<div
  v-if="sidebarOpen || usuarioSidebar"
  class="fixed inset-0 z-20"
  style="background-color: rgba(0, 0, 0, 30%);"
  @click="sidebarOpen = false; usuarioSidebar = false">
</div>

<SidebarCategorias 
  :open="sidebarOpen" 
  :toggleSidebar="toggleSidebar" 
/>

<SidebarUsuario :open="usuarioSidebar" />


  <div class="contenedor-principal">

    <button class="zippia-boton" @click="volver " style="position: absolute; top: 120px; left: 20px; padding: 5px 12px; font-size: 14pt;">
      
  ← Volver
</button>

    <div class="card-detalle" v-if="producto">

     
      <img
        v-if="producto.imagenes && producto.imagenes.length > 0"
        :src="`http://localhost:8000/images/${producto.imagenes[0].nombre}`"
        class="imagen-producto"
      />

      <div v-else class="sin-imagen">
        Sin imagen
      </div>

      
      <h1 class="titulo">{{ producto.nombre }}</h1>

      
      <p class="marca">
        {{ producto.marca?.nombre_marca || 'Sin marca' }}
      </p>

      
      <p class="precio">
        ${{ producto.precio }}
      </p>

     

     
      <h3 class="subtitulo">Tallas</h3>

      <div class="tallas">
            <span
        v-for="t in ['XS','S','M','L','XL']"
        :key="t"
        class="talla"
        :class="{ activa: tallaSeleccionada === t }"
        @click="seleccionarTalla(t)"
      >
        {{ t }}
      </span>
      </div>

     
     <button class="zippia-boton mt-4" @click="agregarAlCarrito">
        Agregar al carrito
      </button>

    </div>

    <p v-else>Cargando producto...</p>

  </div>
</template>

<script setup>
import Navegacionbarra from "@/components/layouts/Navegacionbarra.vue"
import SidebarCategorias from '@/components/SidebarCategorias.vue'
import SidebarUsuario from '@/components/SidebarUsuarios.vue'
import { useCarritoStore } from "@/stores/carritoStore"
const carritoStore = useCarritoStore()
const agregarAlCarrito = () => {
  if (!producto.value) return

  carritoStore.agregarAlCarrito(producto.value)

  console.log("Producto agregado:", producto.value)
}
const sidebarOpen = ref(false)
const usuarioSidebar = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const usuarioSidebarAbrir = () => {
  usuarioSidebar.value = !usuarioSidebar.value
}

// esto es mio

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const volver = () => {
  router.back()
}

  const tallaSeleccionada = ref(null)

const seleccionarTalla = (t) => {
  tallaSeleccionada.value = t
}

const route = useRoute()
const producto = ref(null)

const cargarProducto = async () => {
  try {
    const id = route.params.id

    const res = await axios.get(
      `http://localhost:8000/api/productos/${id}`
    )

   producto.value = res.data.producto
  } catch (error) {
    console.error("Error:", error)
  }
}

onMounted(() => {
  cargarProducto()
})
</script>

