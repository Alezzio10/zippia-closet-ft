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
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-black"
>
<i class="pi pi-users"></i>
Usuarios
</router-link>

<router-link 
to="/admin/categorias"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-black"
>
<i class="pi pi-tags"></i>
Categorias
</router-link>

<router-link 
to="/admin/productos"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-black"
>
<i class="pi pi-box"></i>
Productos
</router-link>

<router-link 
to="/admin/pedidos"
class="flex items-center gap-2 p-2 rounded hover:bg-primaryDark transition text-black"
>
<i class="pi pi-shopping-cart text-black"></i>
Pedidos
</router-link>

</nav>

<!-- footer -->
<div class="p-4 border-t border-primaryLight">
Administrador
</div>

</div>
</template>
<style>
.menu-btn{
@apply p-3 rounded hover:bg-blue-500 block;
}
</style>