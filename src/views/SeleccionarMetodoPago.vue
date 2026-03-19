<template>
  <div class="min-h-screen flex items-center justify-center relative px-4">
    <img
      src="../../public/logo.jpeg"
      class="absolute opacity-5 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      alt="logo fondo"
    />

    <div class="w-full max-w-3xl">
      <button
        @click="$router.back()"
        class="mb-4 zippia-boton px-5 py-2 text-base leading-none"
      >
        ← Volver
      </button>

      <div class="bg-white shadow-xl rounded-2xl p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
          Seleccionar método de pago
        </h1>

        <p class="text-sm font-semibold text-gray-600 mb-6">
          Elige cómo deseas pagar tu compra.
        </p>

        <div class="flex justify-center">
          <button
            class="zippia-boton px-6 py-3"
            @click="irAPagoTarjeta"
          >
            Tarjeta de crédito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const irAPagoTarjeta = () => {
  router.push("/pago-tarjeta");
};
</script>

