<template>

<div class="mb-6">

<div class="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80 shadow-sm">

<i class="pi pi-search text-[#7F82A6] mr-2"></i>

<input
v-model="search"
@input="emitFilters"
type="text"
placeholder="Buscar categoría..."
class="bg-transparent outline-none w-full text-sm"
/>

</div>

</div>

</template>

<script setup>

import { ref } from "vue"

const emit = defineEmits(["filter"])

const search = ref("")

function emitFilters(){

emit("filter",{
search: search.value
})

}

</script>