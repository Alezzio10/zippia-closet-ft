<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 p-6 min-h-screen">

<h1 class="text-black text-3xl mb-4">

Gestión de Categorías

</h1>

<CategoriasFilters
@filter="filters=$event"
/>

<CategoriasTable
:categorias="categorias"
:filters="filters"
:selected="selectedCategoria"
@select="selectedCategoria=$event"
/>

<CategoriasActions
:selectedCategoria="selectedCategoria"
@reload="loadCategorias"
/>

</div>

</div>

</template>

<script setup>

import { ref,onMounted } from "vue"
import axios from "axios"

import Sidebar from "../../components/layouts/Sidebar.vue"

import CategoriasFilters from "../../components/categorias/CategoriasFilters.vue"
import CategoriasTable from "../../components/categorias/CategoriasTable.vue"
import CategoriasActions from "../../components/categorias/CategoriasActions.vue"

const categorias = ref([])
const filters = ref({
search:""
})
const selectedCategoria = ref(null)

const API="http://localhost:8000/api/categorias"

async function loadCategorias(){

try{

const res = await axios.get(API)

console.log("API RESPONSE:", res.data)

categorias.value = res.data.categorias

}catch(error){

console.error("Error cargando categorias",error)

}

}
onMounted(loadCategorias)

</script>