<template>

<div class="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200">

<!-- titulo -->
<div class="flex items-center justify-between mb-4">

<h2 class="text-lg font-semibold text-black flex items-center gap-2">
<i class="pi pi-filter text-primary"></i>
Filtros de Usuarios
</h2>

<button
class="text-sm bg-black hover:bg-gray-800 px-3 py-1 rounded flex items-center gap-2"
@click="clearFilters"
>
<i class="pi pi-refresh"></i>
Limpiar
</button>

</div>

<!-- filtros -->
<div class="grid md:grid-cols-3 gap-4">

<!-- nombre -->
<div class="relative">

<i class="pi pi-user absolute left-3 top-3 text-gray-400"></i>

<input
v-model="filters.nombre"
type="text"
placeholder="Buscar por nombre"
class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
/>

</div>

<!-- apellido -->
<div class="relative">

<i class="pi pi-id-card absolute left-3 top-3 text-gray-400"></i>

<input
v-model="filters.apellido"
type="text"
placeholder="Buscar por apellido"
class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
/>

</div>

<!-- telefono -->
<div class="relative">

<i class="pi pi-phone absolute left-3 top-3 text-gray-400"></i>

<input
v-model="filters.telefono"
type="text"
placeholder="Buscar por teléfono"
class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
/>

</div>

<!-- rol -->
<div class="relative">

<i class="pi pi-users absolute left-3 top-3 text-gray-400"></i>

<select
v-model="filters.rol"
class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
>

<option disabled value="">Filtrar por rol</option>
<option value="1">Administrador</option>
<option value="2">Cliente</option>

</select>

</div>

<!-- id -->
<div class="relative">

<i class="pi pi-hashtag absolute left-3 top-3 text-gray-400"></i>

<input
v-model="filters.id"
type="number"
placeholder="Buscar por ID"
class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
/>

</div>

<!-- correo -->
<div class="relative">

<i class="pi pi-envelope absolute left-3 top-3 text-gray-400"></i>

<input
v-model="filters.email"
type="text"
placeholder="Buscar por correo"
class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
/>

</div>

</div>

</div>

</template>


<script setup>

import { reactive, watch } from "vue"

const emit = defineEmits(["filter"])

const filters = reactive({
  nombre: "",
  apellido: "",
  telefono: "",
  rol: "",
  id: "",
  email: ""
})

watch(filters, () => {
  emit("filter", { ...filters })
}, { deep: true })

const clearFilters = () => {

filters.nombre = ""
filters.apellido = ""
filters.telefono = ""
filters.rol = ""
filters.id = ""
filters.email = ""

emit("filter", { ...filters })

}

</script>