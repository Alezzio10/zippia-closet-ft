<template>
  <div class="p-8 max-w-6xl mx-auto">

    <!-- Título -->
    <h1 class="text-3xl font-bold mb-8 text-black" style="text-align: center;">
      Carrito de compras
    </h1>

    <!-- Mensaje si está vacío -->
    <div
      v-if="carritoStore.carrito.length === 0"
      class="text-gray-500 mb-6" style="font-weight: bolder;"
    >
      Tu carrito está vacío
    </div>

    <!-- Lista de productos -->
    <div
        v-for="item in carritoStore.carrito"
        :key="item.id"
        class="flex items-center justify-between border rounded-lg p-4 mb-4 bg-white">

        <!-- imagen -->
        <img v-if="item.imagenes && item.imagenes.length > 0":src="`http://localhost:8000/images/${item.imagenes[0].nombre}`" alt="producto" 
        class="w-20 h-20 object-cover rounded"/>

        <div
        v-else
        class="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400 rounded"
        >
        Sin imagen
        </div>

      <!-- Información -->
      <div>
        <h2 class="font-bold text-black">
          {{ item.nombre }}
        </h2>

        <p class="text-gray-500">
          ${{ item.precio }}
        </p>
      </div>

      <!-- Cantidad -->
      <div class="flex items-center gap-3">

        <button
          class="zippia-boton px-3"
          @click="carritoStore.disminuirCantidad(item.id)"
        >
          -
        </button>

        <span class="text-black font-bold">
          {{ item.cantidad }}
        </span>

        <button
          class="zippia-boton px-3"
          @click="carritoStore.aumentarCantidad(item.id)"
        >
          +
        </button>

      </div>

      <!-- Subtotal -->
      <div class="text-black font-bold">
        ${{ (item.precio * item.cantidad).toFixed(2) }}
      </div>

      <!-- Eliminar -->
      <button
        class="zippia-boton"
        @click="carritoStore.eliminarDelCarrito(item.id)"
      >
        Eliminar
      </button>

    </div>

    <!-- Total SIEMPRE visible -->
    <div class="flex justify-between items-center mt-10 border-t pt-6">

      <h2 class="text-2xl font-bold text-black">
        Total: ${{ carritoStore.precioTotal.toFixed(2) }}
      </h2>

      <div class="flex gap-4">

        <router-link
          to="/"
          class="zippia-boton px-6 py-3"
        >
          Seguir comprando
        </router-link>

        <button class="zippia-boton px-6 py-3">
          Finalizar pago
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useCarritoStore } from "@/stores/carritoStore"

const carritoStore = useCarritoStore()
</script>