<template>
  <nav class="zippia-azul text-white shadow-md">
    <!-- w-full para que ocupe todo el ancho y mover el boton de inicar sesion a la derecha-->
    
    <div class="w-full px-6 py-4 flex justify-between items-center">

      <h1 class="text-2xl font-bold">
        <button @click="$emit('toggleSidebar')" class="zippia-boton">
          ☰
        </button>
        Zippia Closet
      </h1>

      <button @click="irLogin" class="zippia-boton px-6 py-3 text-lg">
        Iniciar sesión
      </button>

    </div>

  </nav>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irLogin = () => {
  router.push('/login')
}
</script>
