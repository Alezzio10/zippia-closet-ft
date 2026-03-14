<template>
  <!-- Sidebar -->
  <aside
    :class="[
      'azul-raro-fondo text-black w-64 h-screen fixed z-30 top-0 left-0 shadow-lg transform transition-transform duration-300',
      open? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="p-4 border-b font-bold text-lg azul-raro-fondo">
      Categorías
    </div>
    <ul class="p-4 space-y-2" style="list-style-type: none;">
      <li class="p-2 rounded cursor-pointer hover:bg-[#6F7294]">Camisetas</li>
      <li class="p-2 rounded cursor-pointer hover:bg-[#6F7294]">Pantalones</li>
      <li class="p-2 rounded cursor-pointer hover:bg-[#6F7294]">Vestidos</li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  open: Boolean,
  toggleSidebar: Function
})
</script>