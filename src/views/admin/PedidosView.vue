<template>
  <div class="flex">
    <Sidebar />

    <div class="flex-1 p-6 min-h-screen">
      <h1 class="text-black text-3xl mb-4">Gestión de Pedidos</h1>

      <PedidosFilters @filter="filters = $event" />

      <PedidosTable
        :pedidos="pedidos"
        :filters="filters"
        :selected="selectedPedido"
        @select="selectedPedido = $event"
      />

      <PedidosActions
        :selectedPedido="selectedPedido"
        @reload="loadPedidos"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/services/api";
import Sidebar from "@/components/layouts/Sidebar.vue";

import PedidosFilters from "@/components/pedidos/PedidosFilters.vue";
import PedidosTable from "@/components/pedidos/PedidosTable.vue";
import PedidosActions from "@/components/pedidos/PedidosActions.vue";

const pedidos = ref([]);
const selectedPedido = ref(null);

const filters = ref({
  search: "",
  estado: "",
});

const loadPedidos = async () => {
  try {
    const res = await api.get("/pedidos");
    pedidos.value = res.data?.pedidos || [];
  } catch (e) {
    pedidos.value = [];
  }
};

onMounted(async () => {
  await loadPedidos();
});
</script>

