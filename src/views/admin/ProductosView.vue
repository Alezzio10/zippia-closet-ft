<template>
  <div class="flex">
    <Sidebar />

    <div class="flex-1 p-6 min-h-screen">
      <h1 class="text-black text-3xl mb-4">Gestión de Productos</h1>

      <ProductosFilters @filter="filters = $event" />

      <ProductosTable
        :productos="productos"
        :filters="filters"
        :selected="selectedProducto"
        @select="selectedProducto = $event"
      />

      <ProductosActions
        :selectedProducto="selectedProducto"
        :categorias="categorias"
        :marcas="marcas"
        @reload="loadProductos"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/services/api'
import Sidebar from '@/components/layouts/Sidebar.vue'

import ProductosFilters from '@/components/productos/ProductosFilters.vue'
import ProductosTable from '@/components/productos/ProductosTable.vue'
import ProductosActions from '@/components/productos/ProductosActions.vue'

const productos = ref([])
const categorias = ref([])
const marcas = ref([])
const selectedProducto = ref(null)

const filters = ref({
  search: '',
})

const loadProductos = async () => {
  try {
    const res = await api.get('/productos')
    productos.value = res.data?.productos || []
  } catch (e) {
    productos.value = []
  }
}

const loadCategorias = async () => {
  try {
    const res = await api.get('/categorias')
    categorias.value = res.data?.categorias || []
  } catch (e) {
    categorias.value = []
  }
}

const loadMarcas = async () => {
  try {
    const res = await api.get('/marcas')
    marcas.value = res.data?.marcas || []
  } catch (e) {
    marcas.value = []
  }
}

onMounted(async () => {
  await Promise.all([loadProductos(), loadCategorias(), loadMarcas()])
})
</script>
