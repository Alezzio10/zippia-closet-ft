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
          Mis pedidos
        </h1>

        <p class="text-sm font-semibold text-gray-600 mb-6">
          Aquí solo se muestran los pedidos pagados.
        </p>

        <div v-if="cargando" class="input bg-gray-50 text-gray-500">
          Cargando pedidos...
        </div>

        <p v-else-if="error" class="input bg-red-50 text-red-600 text-sm">
          {{ error }}
        </p>

        <div v-else-if="!pedidos.length" class="input bg-gray-50 text-gray-500">
          Todavía no tienes pedidos pagados.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="pedido in pedidos"
            :key="pedido.id"
            class="border border-gray-300 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm text-gray-500">
                  {{ formatearFecha(pedido.created_at) }}
                </p>
              </div>
              <span class="px-3 py-1 rounded-lg text-xs border-2 border-black zippia-azul text-black font-bold badge-zippia">
                Pagado
              </span>
            </div>

            <p class="text-sm font-semibold text-gray-600 mb-2">
              Productos
            </p>

            <div v-if="pedido.detalles?.length" class="space-y-2">
              <div
                v-for="detalle in pedido.detalles"
                :key="detalle.id"
                class="grid grid-cols-12 gap-3 border border-gray-200 rounded-lg px-3 py-2"
              >
                <span class="col-span-7 text-sm text-gray-700">
                  {{ detalle.producto?.nombre || "Producto" }} x{{ detalle.cantidad }}
                </span>
                <span class="col-span-5 text-right text-sm font-semibold text-gray-800">
                  ${{ Number(detalle.subtotal || (Number(detalle.precio || 0) * Number(detalle.cantidad || 0))).toFixed(2) }}
                </span>
                <span class="col-span-12 text-xs text-gray-500">
                  Marca: {{ detalle.producto?.marca?.nombre_marca || "Sin marca" }}
                </span>
                <span class="col-span-12 text-xs text-gray-500">
                  Talla: {{ detalle.talla || "No especificada" }}
                </span>
                <span class="col-span-12 text-xs text-gray-500 text-right">
                  ${{ Number(detalle.precio || 0).toFixed(2) }} c/u
                </span>
              </div>
            </div>
            <div v-else class="input bg-gray-50 text-gray-500 text-sm">
              Este pedido no tiene detalle de productos.
            </div>

            <div class="mt-4 pt-3 border-t flex justify-end">
              <span class="text-sm font-bold text-gray-900">
                Total: ${{ totalDetalle(pedido).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const pedidos = ref([]);
const cargando = ref(false);
const error = ref("");

const formatearFecha = (fecha) => {
  if (!fecha) return "Fecha no disponible";
  return new Date(fecha).toLocaleString("es-SV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const totalDetalle = (pedido) => {
  const detalles = Array.isArray(pedido?.detalles) ? pedido.detalles : [];
  if (!detalles.length) return Number(pedido?.total || 0);

  return detalles.reduce((acc, detalle) => {
    const subtotal = Number(
      detalle?.subtotal || (Number(detalle?.precio || 0) * Number(detalle?.cantidad || 0))
    );
    return acc + subtotal;
  }, 0);
};

const cargarPedidosPagados = async () => {
  error.value = "";
  cargando.value = true;

  try {
    let userId = authStore.user?.id;

    if (!userId) {
      const me = await api.get("/auth/me");
      if (me?.data?.id) {
        authStore.user = me.data;
        userId = me.data.id;
      }
    }

    if (!userId) {
      error.value = "Debes iniciar sesión para ver tus pedidos.";
      pedidos.value = [];
      return;
    }

    const { data } = await api.get("/pedidos/mis-pedidos", {
      params: { user_id: userId },
    });

    const pedidosApi = data?.pedidos || [];
    pedidos.value = pedidosApi.filter((pedido) => Array.isArray(pedido?.detalles) && pedido.detalles.length > 0);
  } catch (e) {
    error.value = e?.response?.data?.message || "No se pudieron cargar tus pedidos pagados.";
    pedidos.value = [];
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarPedidosPagados();
});
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition;
}

.badge-zippia {
  font-family: 'Abhaya Libre', serif;
}
</style>
