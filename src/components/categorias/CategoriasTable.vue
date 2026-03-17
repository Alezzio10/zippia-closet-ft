<template>

<div class="bg-white shadow-md rounded-xl overflow-hidden">

<table class="w-full">

<thead class="bg-[#7F82A6] text-white">

<tr>

<thead class="bg-[#7F82A6] text-white">
<tr>
<th class="p-3 text-left">Categoría</th>
<th class="p-3 text-left">Descripción</th>
<th class="p-3 text-left">ID</th>
</tr>
</thead>

</tr>

</thead>

<tbody>

<tr
v-for="cat in filteredCategorias"
:key="cat.id"
@click="select(cat)"
class="border-b hover:bg-gray-100 cursor-pointer"
:class="selected?.id === cat.id ? 'bg-gray-200' : ''"
>

<td class="p-3">{{ cat.nombre_categoria }}</td>
<td class="p-3">{{ cat.descripcion_categoria }}</td>
<td class="p-3">{{ cat.id }}</td>
</tr>

</tbody>

</table>

</div>

</template>

<script setup>

import { computed } from "vue"

const props = defineProps({

categorias:Array,
filters:Object,
selected:Object

})

const emit = defineEmits(["select"])

const filteredCategorias = computed(()=>{

const search = props.filters.search?.toLowerCase() || ""

return (props.categorias || []).filter(cat =>
(cat.nombre_categoria || "").toLowerCase().includes(search)
)

})
function select(cat){
emit("select",cat)
}

</script>