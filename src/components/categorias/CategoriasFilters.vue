<template>

<div class="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-semibold text-black flex items-center gap-2">
      <i class="pi pi-filter text-primary"></i>
      Gestión de categorías
    </h2>
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <div class="relative">
      <i class="pi pi-search absolute left-3 top-3 text-gray-400"></i>
      <input
        v-model="search"
        @input="emitFilters"
        type="text"
        placeholder="Buscar categoría..."
        class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
      />
    </div>
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