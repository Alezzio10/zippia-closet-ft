<template>
<div class="w-64 min-h-screen bg-primary text-white flex flex-col">

<!-- Logo / titulo -->
<div class="p-6 text-xl font-bold border-b border-primaryLight">
Zippia Closet
</div>

<!-- navegación -->
<nav class="flex-1 p-4 space-y-2">

<router-link 
to="/admin/users"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-white"
>
<i class="pi pi-users"></i>
Usuarios
</router-link>

<router-link 
to="/admin/categorias"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-white"
>
<i class="pi pi-tags"></i>
Categorias
</router-link>

<router-link 
to="/admin/productos"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-white"
>
<i class="pi pi-box"></i>
Productos
</router-link>

<router-link 
to="/admin/pedidos"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-white"
>
<i class="pi pi-shopping-cart"></i>
Pedidos
</router-link>
 
<div class="text-xs text-white/70 px-2 pt-2">
  (Secciones en construcción)
</div>

</nav>

<!-- footer -->
<div class="p-4 border-t border-primaryLight">
  <div>Administrador</div>
  <button
    type="button"
    class="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded bg-white/10 hover:bg-white/20 transition"
    @click="cerrarSesion"
  >
    <i class="pi pi-sign-out"></i>
    Cerrar sesión
  </button>
</div>

</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const cerrarSesion = async () => {
  await authStore.logout()
}
</script>
<style>
.menu-btn{
@apply p-3 rounded hover:bg-blue-500 block;
}
</style>