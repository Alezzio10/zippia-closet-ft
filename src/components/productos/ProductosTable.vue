<template>
  <div class="bg-white shadow-md rounded-xl overflow-hidden">
    <div class="overflow-auto">
      <table class="min-w-full text-sm text-black">
        <thead class="bg-[#7F82A6] text-black">
          <tr class="text-left">
            <th class="p-3">Nombre</th>
            <th class="p-3">Categoría</th>
            <th class="p-3">Marca</th>
            <th class="p-3">Precio</th>
            <th class="p-3">Talla</th>
            <th class="p-3">Stock</th>
            <th class="p-3">ID</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in filteredProductos"
            :key="p.id"
            class="border-b hover:bg-gray-50 cursor-pointer"
            :class="selected?.id === p.id ? 'bg-gray-200' : ''"
            @click="select(p)"
          >
            <td class="p-3 align-top text-black">{{ p.nombre }}</td>
            <td class="p-3 align-top text-black">{{ p.categoria?.nombre_categoria || '—' }}</td>
            <td class="p-3 align-top text-black">{{ p.marca?.nombre_marca || '—' }}</td>
            <td class="p-3 align-top text-black">${{ Number(p.precio || 0).toFixed(2) }}</td>
            <td class="p-3 align-top text-black">{{ p.talla }}</td>
            <td class="p-3 align-top text-black">{{ p.stock }}</td>
            <td class="p-3 align-top text-black">{{ p.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  productos: Array,
  filters: Object,
  selected: Object,
})

const emit = defineEmits(['select'])

const filteredProductos = computed(() => {
  const search = props.filters?.search?.toLowerCase() || ''
  return (props.productos || []).filter((p) =>
    (p.nombre || '').toLowerCase().includes(search)
  )
})

const select = (p) => emit('select', p)
</script>
