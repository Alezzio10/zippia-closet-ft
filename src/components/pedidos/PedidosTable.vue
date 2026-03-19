<template>
  <div class="bg-white shadow-md rounded-xl overflow-hidden">
    <div class="overflow-auto">
      <table class="min-w-full text-sm text-black">
        <thead class="bg-[#7F82A6] text-black">
          <tr class="text-left">
            <th class="p-3">Usuario</th>
            <th class="p-3">Correo</th>
            <th class="p-3">Total</th>
            <th class="p-3">Estado</th>
            <th class="p-3">Productos</th>
            <th class="p-3">Fecha</th>
            <th class="p-3">ID</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in filteredPedidos"
            :key="p.id"
            class="border-b hover:bg-gray-50 cursor-pointer"
            :class="selected?.id === p.id ? 'bg-gray-200' : ''"
            @click="select(p)"
          >
            <td class="p-3 align-top text-black">{{ p.usuario?.name || '—' }}</td>
            <td class="p-3 align-top text-black">{{ p.usuario?.email || '—' }}</td>
            <td class="p-3 align-top text-black">${{ Number(p.total || 0).toFixed(2) }}</td>
            <td class="p-3 align-top text-black">{{ p.estado || '—' }}</td>
            <td class="p-3 align-top text-black">{{ (p.detalles || []).length }}</td>
            <td class="p-3 align-top text-black">{{ formatearFecha(p.created_at) }}</td>
            <td class="p-3 align-top text-black">{{ p.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pedidos: Array,
  filters: Object,
  selected: Object,
});

const emit = defineEmits(["select"]);

const formatearFecha = (fecha) => {
  if (!fecha) return "—";
  return new Date(fecha).toLocaleString("es-SV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const filteredPedidos = computed(() => {
  const search = props.filters?.search?.toLowerCase() || "";
  const estado = props.filters?.estado || "";

  return (props.pedidos || []).filter((p) => {
    if (estado && String(p.estado || "") !== String(estado)) return false;

    if (!search) return true;

    const fields = [
      String(p.id || ""),
      String(p.estado || ""),
      String(p.usuario?.name || ""),
      String(p.usuario?.email || ""),
    ]
      .join(" ")
      .toLowerCase();

    return fields.includes(search);
  });
});

const select = (p) => emit("select", p);
</script>

