<template>
  <div class="border p-4 rounded-lg" style="background-color: white;">

    <!-- Imagen -->
    <div class="mb-4 w-full h-40 overflow-hidden">
      <img
        v-if="producto.imagenes && producto.imagenes.length > 0"
        :src="`http://localhost:8000/images/${producto.imagenes[0].nombre}`"
        :alt="producto.nombre"
        class="w-full h-48 object-contain rounded"/>


        
      <div v-else class="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-400">
        Sin imagen
      </div>
    </div>

    <!-- Nombre -->
    <h2 class="text-black font-bold" style="font-size: medium;">
      {{ producto.nombre }}
    </h2>

    <!-- Marca -->
    <p class="text-gray-500">
      {{ producto.marca?.nombre_marca }}
    </p>

    <!-- Precio -->
    <p class="text-black font-semibold mt-2">
      ${{ producto.precio }}
    </p>

    <!-- Botones -->
    <div class="mt-4 flex gap-2 flex-wrap">
      <button class="zippia-boton" style="font-size: 20pt; font-weight: normal;">
       👁
      </button>
      <button class="zippia-boton" style="font-size: 20pt;" @click="agregarAlCarrito"> 
        Agregar
      </button>
    </div>

  </div>
</template>

<script setup>

const props = defineProps({
  producto: Object
})

const emit = defineEmits(['agregar-carrito'])

const agregarAlCarrito = () => {
  emit('agregar-carrito', props.producto)
}

</script>