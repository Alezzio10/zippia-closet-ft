<template>
  <div class="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-black flex items-center gap-2">
        <i class="pi pi-filter text-primary"></i>
        Gestión de pedidos
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="relative">
        <i class="pi pi-search absolute left-3 top-3 text-gray-400"></i>
        <input
          v-model="search"
          @input="emitFilters"
          type="text"
          placeholder="Buscar por usuario, correo, estado o ID..."
          class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        />
      </div>

      <div>
        <select
          v-model="estado"
          @change="emitFilters"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="PAGADO">PAGADO</option>
          <option value="CANCELADO">CANCELADO</option>
          <option value="ENVIADO">ENVIADO</option>
          <option value="ENTREGADO">ENTREGADO</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["filter"]);
const search = ref("");
const estado = ref("");

const emitFilters = () => {
  emit("filter", { search: search.value, estado: estado.value });
};
</script>

