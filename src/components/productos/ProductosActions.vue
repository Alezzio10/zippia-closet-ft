<template>
  <div class="bg-white shadow-md rounded-xl p-4 mt-6 border border-gray-200">
    <div class="flex gap-4 flex-wrap">
    <button
      @click="addProducto"
      class="bg-[#7F82A6] text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition"
    >
      <i class="pi pi-plus"></i>
      Añadir
    </button>

    <button
      @click="editProducto"
      :disabled="!selectedProducto"
      class="bg-amber-400 text-black px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
    >
      <i class="pi pi-pencil"></i>
      Editar
    </button>

    <button
      @click="deleteProducto"
      :disabled="!selectedProducto"
      class="bg-red-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
    >
      <i class="pi pi-trash"></i>
      Eliminar
    </button>
    </div>

    <!-- indicador producto seleccionado -->
    <div
      v-if="selectedProducto"
      class="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded"
    >
      Producto seleccionado:
      <strong>{{ selectedProducto.nombre }}</strong>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import api from '@/services/api'
import { alerts } from '@/utils/alerts'

const props = defineProps({
  selectedProducto: Object,
  categorias: Array,
  marcas: Array,
})

const emit = defineEmits(['reload'])

const buildOptionsHtml = (items, labelKey, selectedId) => {
  const list = items || []
  const opts = list
    .map((i) => {
      const id = i.id
      const label = i[labelKey] ?? `#${id}`
      const selected = String(id) === String(selectedId) ? 'selected' : ''
      return `<option value="${id}" ${selected}>${label}</option>`
    })
    .join('')
  return opts
}

async function addProducto() {
  try {
    const catOptions = buildOptionsHtml(props.categorias, 'nombre_categoria', '')
    const marcaOptions = buildOptionsHtml(props.marcas, 'nombre_marca', '')

    const { value: form } = await Swal.fire({
      title: 'Nuevo Producto',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <input id="precio" class="swal2-input" placeholder="Precio" type="number" step="0.01" min="0">
        <input id="talla" class="swal2-input" placeholder="Talla (ej: S, M, L)">
        <input id="stock" class="swal2-input" placeholder="Stock" type="number" min="0">
        <select id="categoria_id" class="swal2-select" style="width: 100%; margin-top: .5rem;">
          <option disabled value="" selected>Seleccione categoría</option>
          ${catOptions}
        </select>
        <select id="marca_id" class="swal2-select" style="width: 100%; margin-top: .5rem;">
          <option disabled value="" selected>Seleccione marca</option>
          ${marcaOptions}
        </select>
      `,
      confirmButtonColor: '#7F82A6',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value
        const precio = document.getElementById('precio').value
        const talla = document.getElementById('talla').value
        const stock = document.getElementById('stock').value
        const categoria_id = document.getElementById('categoria_id').value
        const marca_id = document.getElementById('marca_id').value

        return {
          nombre,
          precio: Number(precio),
          talla,
          stock: Number(stock),
          categoria_id: Number(categoria_id),
          marca_id: Number(marca_id),
        }
      },
    })

    if (!form) return

    await api.post('/productos', form)
    alerts.success('Producto creado correctamente')
    emit('reload')
  } catch (error) {
    const msg = error?.response?.data?.message || 'Error al crear el producto'
    alerts.error(msg)
  }
}

async function editProducto() {
  if (!props.selectedProducto) return

  const p = props.selectedProducto

  try {
    const catOptions = buildOptionsHtml(props.categorias, 'nombre_categoria', p.categoria_id)
    const marcaOptions = buildOptionsHtml(props.marcas, 'nombre_marca', p.marca_id)

    const { value: form } = await Swal.fire({
      title: 'Editar Producto',
      html: `
        <input id="nombre" class="swal2-input" value="${p.nombre ?? ''}">
        <input id="precio" class="swal2-input" value="${p.precio ?? 0}" type="number" step="0.01" min="0">
        <input id="talla" class="swal2-input" value="${p.talla ?? ''}">
        <input id="stock" class="swal2-input" value="${p.stock ?? 0}" type="number" min="0">
        <select id="categoria_id" class="swal2-select" style="width: 100%; margin-top: .5rem;">
          ${catOptions}
        </select>
        <select id="marca_id" class="swal2-select" style="width: 100%; margin-top: .5rem;">
          ${marcaOptions}
        </select>
      `,
      confirmButtonColor: '#7F82A6',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value
        const precio = document.getElementById('precio').value
        const talla = document.getElementById('talla').value
        const stock = document.getElementById('stock').value
        const categoria_id = document.getElementById('categoria_id').value
        const marca_id = document.getElementById('marca_id').value

        return {
          nombre,
          precio: Number(precio),
          talla,
          stock: Number(stock),
          categoria_id: Number(categoria_id),
          marca_id: Number(marca_id),
        }
      },
    })

    if (!form) return

    await api.put(`/productos/${p.id}`, form)
    alerts.success('Producto actualizado correctamente')
    emit('reload')
  } catch (error) {
    const msg = error?.response?.data?.message || 'Error al actualizar el producto'
    alerts.error(msg)
  }
}

async function deleteProducto() {
  if (!props.selectedProducto) return

  const confirmed = await alerts.confirm('¿Eliminar este producto?')
  if (!confirmed) return

  try {
    await api.delete(`/productos/${props.selectedProducto.id}`)
    alerts.success('Producto eliminado')
    emit('reload')
  } catch (error) {
    const status = error?.response?.status
    const msg = error?.response?.data?.message || 'Error al eliminar el producto'

    if (status === 409) {
      await Swal.fire({
        icon: 'warning',
        title: 'No se puede eliminar',
        text: msg,
        confirmButtonColor: '#7F82A6',
      })
    } else {
      alerts.error(msg)
    }
  }
}
</script>
