<template>
  <div class="bg-white shadow-md rounded-xl p-4 mt-6 border border-gray-200">
    <div class="flex gap-4 flex-wrap items-center">
      <button
        @click="$emit('reload')"
        class="bg-[#7F82A6] text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition"
      >
        <i class="pi pi-refresh"></i>
        Refrescar
      </button>

      <select
        v-model="nuevoEstado"
        class="px-3 py-2 border rounded-lg"
        :disabled="!selectedPedido"
      >
        <option value="">Cambiar estado…</option>
        <option value="PENDIENTE">PENDIENTE</option>
        <option value="PAGADO">PAGADO</option>
        <option value="CANCELADO">CANCELADO</option>
        <option value="ENVIADO">ENVIADO</option>
        <option value="ENTREGADO">ENTREGADO</option>
      </select>

      <button
        @click="actualizarEstado"
        :disabled="!selectedPedido || !nuevoEstado"
        class="bg-amber-400 text-black px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
      >
        <i class="pi pi-check"></i>
        Aplicar
      </button>

      <button
        @click="verDetalle"
        :disabled="!selectedPedido"
        class="bg-gray-200 text-black px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
      >
        <i class="pi pi-eye"></i>
        Ver detalle
      </button>

      <button
        @click="eliminarPedido"
        :disabled="!selectedPedido"
        class="bg-red-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
      >
        <i class="pi pi-trash"></i>
        Eliminar
      </button>
    </div>

    <div
      v-if="selectedPedido"
      class="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded"
    >
      Pedido seleccionado:
      <strong>#{{ selectedPedido.id }}</strong>
      ({{ selectedPedido.usuario?.name || '—' }})
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import api from "@/services/api";
import { alerts } from "@/utils/alerts";
import { ref, watch } from "vue";

const props = defineProps({
  selectedPedido: Object,
});

const emit = defineEmits(["reload"]);

const nuevoEstado = ref("");

watch(
  () => props.selectedPedido?.id,
  () => {
    nuevoEstado.value = "";
  }
);

async function actualizarEstado() {
  if (!props.selectedPedido || !nuevoEstado.value) return;
  try {
    await api.patch(`/pedidos/estado/${props.selectedPedido.id}`, {
      estado: nuevoEstado.value,
    });
    alerts.success("Estado del pedido actualizado");
    emit("reload");
  } catch (error) {
    const msg =
      error?.response?.data?.message || "No se pudo actualizar el estado del pedido";
    alerts.error(msg);
  }
}

async function verDetalle() {
  if (!props.selectedPedido) return;

  const detalles = (props.selectedPedido.detalles || [])
    .map((d) => {
      const nombre = d?.producto?.nombre || "Producto";
      const cantidad = d?.cantidad ?? 0;
      const talla = d?.talla ? ` (Talla ${d.talla})` : "";
      const subtotal = Number(d?.subtotal || 0).toFixed(2);
      return `• ${nombre}${talla} x${cantidad} — $${subtotal}`;
    })
    .join("<br/>");

  await Swal.fire({
    title: `Pedido #${props.selectedPedido.id}`,
    html: `
      <div style="text-align:left">
        <div><b>Usuario:</b> ${props.selectedPedido.usuario?.name || "—"}</div>
        <div><b>Correo:</b> ${props.selectedPedido.usuario?.email || "—"}</div>
        <div><b>Estado:</b> ${props.selectedPedido.estado || "—"}</div>
        <div><b>Total:</b> $${Number(props.selectedPedido.total || 0).toFixed(2)}</div>
        <hr/>
        <div><b>Detalles:</b></div>
        <div>${detalles || "Sin detalles"}</div>
      </div>
    `,
    confirmButtonColor: "#7F82A6",
  });
}

async function eliminarPedido() {
  if (!props.selectedPedido) return;

  const confirmed = await alerts.confirm("¿Eliminar este pedido?");
  if (!confirmed) return;

  try {
    await api.delete(`/pedidos/${props.selectedPedido.id}`);
    alerts.success("Pedido eliminado");
    emit("reload");
  } catch (error) {
    const msg = error?.response?.data?.message || "No se pudo eliminar el pedido";
    alerts.error(msg);
  }
}
</script>

