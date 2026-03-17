<script setup>
import { onMounted, ref } from 'vue'
import api from '@/services/api'

const numeroTarjeta = ref('')
const mesVencimiento = ref('')
const anioVencimiento = ref('')
const cvv = ref('')
const userId = ref(1) // fallback temporal

const errores = ref({
  numeroTarjeta: '',
  vencimiento: '',
  cvv: '',
  general: '',
})

const MAX_DIGITOS_TARJETA = 19
const tipoTarjeta = ref('') // visa, mastercard, amex, otros

const metodosPago = ref([])
const cargandoMetodos = ref(false)
const mensajeOk = ref('')
const mensajeError = ref('')
const pagandoMetodoId = ref(null)
const estadoPagoPorMetodo = ref({}) // { [metodoId]: { pago_id, estado } }

const cargarMetodosPago = async () => {
  cargandoMetodos.value = true
  try {
    const { data } = await api.get('/metodo-pagos', { params: { user_id: userId.value } })
    metodosPago.value = data?.data || data?.['metodos de pago: '] || []
  } catch (e) {
    metodosPago.value = []
  } finally {
    cargandoMetodos.value = false
  }
}

const manejarInputNumeroTarjeta = (event) => {
  // Tomar el valor tecleado
  let valor = event.target.value || ''
  // Quitar todo lo que no sea dígito
  valor = valor.replace(/\D+/g, '')
  // Limitar a máximo de dígitos
  if (valor.length > MAX_DIGITOS_TARJETA) {
    valor = valor.slice(0, MAX_DIGITOS_TARJETA)
  }
  // Actualizar el modelo
  numeroTarjeta.value = valor

  // Detectar tipo de tarjeta (muy básico)
  if (/^4/.test(valor)) {
    tipoTarjeta.value = 'visa'
  } else if (/^5[1-5]/.test(valor)) {
    tipoTarjeta.value = 'mastercard'
  } else if (/^3[47]/.test(valor)) {
    tipoTarjeta.value = 'amex'
  } else if (valor.length > 0) {
    tipoTarjeta.value = 'otro'
  } else {
    tipoTarjeta.value = ''
  }

  // Validación en tiempo real
  if (!valor) {
    errores.value.numeroTarjeta = 'Ingresa el número de tarjeta.'
  } else if (valor.length < 13) {
    errores.value.numeroTarjeta = 'El número es demasiado corto (mínimo 13 dígitos).'
  } else {
    errores.value.numeroTarjeta = ''
  }
}

const manejarInputMes = (event) => {
  let valor = event.target.value || ''
  // Solo dígitos
  valor = valor.replace(/\D+/g, '')
  // Máximo 2 dígitos
  if (valor.length > 2) {
    valor = valor.slice(0, 2)
  }
  mesVencimiento.value = valor
}

const manejarInputAnio = (event) => {
  let valor = event.target.value || ''
  // Solo dígitos
  valor = valor.replace(/\D+/g, '')
  // Máximo 4 dígitos
  if (valor.length > 4) {
    valor = valor.slice(0, 4)
  }
  anioVencimiento.value = valor
}

const manejarInputCvv = (event) => {
  let valor = event.target.value || ''
  // Solo dígitos
  valor = valor.replace(/\D+/g, '')
  // Máximo 4 dígitos
  if (valor.length > 4) {
    valor = valor.slice(0, 4)
  }
  cvv.value = valor

  if (!valor) {
    errores.value.cvv = 'Ingresa el CVV.'
  } else if (valor.length < 3 || valor.length > 4) {
    errores.value.cvv = 'El CVV debe tener 3 o 4 dígitos.'
  } else {
    errores.value.cvv = ''
  }
}

const limpiarErrores = () => {
  errores.value = {
    numeroTarjeta: '',
    vencimiento: '',
    cvv: '',
    general: '',
  }
}

const validarYEnviar = async () => {
  limpiarErrores()
  mensajeOk.value = ''
  mensajeError.value = ''

  const hoy = new Date()
  const anioActual = hoy.getFullYear()
  const mesActual = hoy.getMonth() + 1 // 1-12

  let valido = true

  // Validación básica de número de tarjeta (solo dígitos y longitud mínima)
  const numeroLimpio = numeroTarjeta.value.replace(/\s+/g, '')
  if (!numeroLimpio || !/^\d{13,19}$/.test(numeroLimpio)) {
    errores.value.numeroTarjeta = 'Ingresa un número de tarjeta válido (solo dígitos, 13 a 19 caracteres).'
    valido = false
  }

  const mes = parseInt(mesVencimiento.value, 10)
  const anio = parseInt(anioVencimiento.value, 10)

  if (
    Number.isNaN(mes) ||
    Number.isNaN(anio) ||
    mes < 1 ||
    mes > 12
  ) {
    errores.value.vencimiento = 'Ingresa un mes (1-12) y año válidos.'
    valido = false
  } else {
    // Validar que la fecha de vencimiento sea estrictamente mayor a la actual
    if (anio < anioActual || (anio === anioActual && mes <= mesActual)) {
      errores.value.vencimiento = 'La tarjeta debe tener una fecha de vencimiento posterior a la actual.'
      valido = false
    }
  }

  if (!/^\d{3,4}$/.test(cvv.value)) {
    errores.value.cvv = 'Ingresa un CVV válido de 3 o 4 dígitos.'
    valido = false
  }

  if (!valido) {
    errores.value.general = 'Por favor corrige los errores antes de continuar.'
    return
  }

  try {
    const payload = {
      user_id: userId.value,
      numeroTarjeta: numeroLimpio,
      cvv: cvv.value,
      mesVencimiento: parseInt(mesVencimiento.value, 10),
      anioVencimiento: parseInt(anioVencimiento.value, 10),
    }

    await api.post('/tokenizar', payload)

    mensajeOk.value = 'Tarjeta tokenizada y guardada correctamente.'
    numeroTarjeta.value = ''
    mesVencimiento.value = ''
    anioVencimiento.value = ''
    cvv.value = ''
    tipoTarjeta.value = ''

    await cargarMetodosPago()
  } catch (e) {
    const msg = e?.response?.data?.message || 'No se pudo tokenizar la tarjeta.'
    mensajeError.value = msg
  }
}

onMounted(() => {
  cargarMetodosPago()
})

const probarPago = async (metodoId) => {
  mensajeOk.value = ''
  mensajeError.value = ''
  pagandoMetodoId.value = metodoId
  try {
    // 1) crear pago (Pendiente) + pedido de prueba
    const { data } = await api.post(`/metodo-pagos/${metodoId}/probar-pago`, {
      user_id: userId.value,
      monto: 1.00,
    })

    const pagoId = data?.pago?.id
    const estadoInicial = data?.pago?.estado

    if (!pagoId) {
      throw new Error('No se pudo obtener el pago_id de la respuesta.')
    }

    estadoPagoPorMetodo.value = {
      ...estadoPagoPorMetodo.value,
      [metodoId]: { pago_id: pagoId, estado: estadoInicial || 'Pendiente' },
    }

    // 2) ejecutar /pagos/:id/pagar (Wompi)
    const respPagar = await api.post(`/pagos/${pagoId}/pagar`, { user_id: userId.value })
    const estadoLuego = respPagar?.data?.pago?.estado

    estadoPagoPorMetodo.value = {
      ...estadoPagoPorMetodo.value,
      [metodoId]: { pago_id: pagoId, estado: estadoLuego || 'Procesando' },
    }

    mensajeOk.value = `Pago de prueba iniciado (pago_id=${pagoId}).`
  } catch (e) {
    const msg = e?.response?.data?.message || e?.message || 'No se pudo iniciar el pago de prueba.'
    mensajeError.value = msg
  } finally {
    pagandoMetodoId.value = null
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
      <h2 class="text-2xl font-bold mb-4 text-center zippia-azul">
        Datos de tarjeta
      </h2>
      <p class="text-sm text-gray-600 mb-6 text-center">
        Ingresa los datos de tu tarjeta de crédito o débito. La fecha de vencimiento
        debe ser mayor a la fecha actual.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form @submit.prevent="validarYEnviar" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Número de tarjeta
          </label>
          <div class="relative">
            <input
              v-model="numeroTarjeta"
              type="text"
              inputmode="numeric"
              :maxlength="MAX_DIGITOS_TARJETA"
              @input="manejarInputNumeroTarjeta"
              autocomplete="cc-number"
              placeholder="XXXX XXXX XXXX XXXX"
              class="w-full p-2 pr-12 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            <div
              v-if="tipoTarjeta"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span
                v-if="tipoTarjeta === 'visa'"
                class="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700"
              >
                VISA
              </span>
              <span
                v-else-if="tipoTarjeta === 'mastercard'"
                class="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-700"
              >
                MC
              </span>
              <span
                v-else-if="tipoTarjeta === 'amex'"
                class="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700"
              >
                AMEX
              </span>
              <span
                v-else
                class="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700"
              >
                CARD
              </span>
            </div>
          </div>
          <p v-if="errores.numeroTarjeta" class="text-red-600 text-xs mt-1">
            {{ errores.numeroTarjeta }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Mes de vencimiento (MM)
            </label>
            <input
              v-model="mesVencimiento"
              type="text"
              inputmode="numeric"
              maxlength="2"
              @input="manejarInputMes"
              placeholder="MM"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Año de vencimiento (AAAA)
            </label>
            <input
              v-model="anioVencimiento"
              type="text"
              inputmode="numeric"
              maxlength="4"
              @input="manejarInputAnio"
              placeholder="AAAA"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>
        </div>
        <p v-if="errores.vencimiento" class="text-red-600 text-xs mt-1">
          {{ errores.vencimiento }}
        </p>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            v-model="cvv"
            type="password"
            inputmode="numeric"
            autocomplete="cc-csc"
            placeholder="3 o 4 dígitos"
            maxlength="4"
            @input="manejarInputCvv"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
          <p v-if="errores.cvv" class="text-red-600 text-xs mt-1">
            {{ errores.cvv }}
          </p>
        </div>

        <p v-if="errores.general" class="text-red-600 text-xs mt-1">
          {{ errores.general }}
        </p>

        <p v-if="mensajeOk" class="text-green-600 text-sm">
          {{ mensajeOk }}
        </p>
        <p v-if="mensajeError" class="text-red-600 text-sm">
          {{ mensajeError }}
        </p>

        <button
          type="submit"
          class="w-full mt-4 zippia-boton px-4 py-2 text-white font-semibold rounded"
        >
          Tokenizar y guardar
        </button>
      </form>

        <div class="border rounded p-4">
          <div class="flex items-center justify-between gap-3 mb-3">
            <h3 class="font-semibold text-gray-800">Mis métodos de pago (user_id={{ userId }})</h3>
            <button
              type="button"
              class="px-3 py-2 text-sm border rounded hover:bg-gray-50"
              @click="cargarMetodosPago"
              :disabled="cargandoMetodos"
            >
              {{ cargandoMetodos ? 'Cargando…' : 'Refrescar' }}
            </button>
          </div>

          <div v-if="cargandoMetodos" class="text-sm text-gray-600">
            Cargando métodos…
          </div>

          <div v-else-if="!metodosPago.length" class="text-sm text-gray-600">
            No hay métodos de pago guardados.
          </div>

          <div v-else class="overflow-auto">
            <table class="min-w-full text-sm text-gray-800">
              <thead>
                <tr class="text-left text-gray-600">
                  <th class="py-2 pr-3">ID</th>
                  <th class="py-2 pr-3">Últimos 4</th>
                  <th class="py-2 pr-3">Vencimiento</th>
                  <th class="py-2 pr-3">Token</th>
                  <th class="py-2 pr-3">Estado pago</th>
                  <th class="py-2 pr-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in metodosPago" :key="m.id" class="border-t">
                  <td class="py-2 pr-3 text-gray-900">{{ m.id }}</td>
                  <td class="py-2 pr-3 text-gray-900">**** {{ m.cuatro_digitos }}</td>
                  <td class="py-2 pr-3 text-gray-900">{{ m.fecha_vencimiento }}</td>
                  <td class="py-2 pr-3 text-gray-900">
                    <span v-if="m.token_tarjeta">
                      {{ String(m.token_tarjeta).slice(0, 6) }}…{{ String(m.token_tarjeta).slice(-4) }}
                    </span>
                    <span v-else class="text-gray-500">—</span>
                  </td>
                  <td class="py-2 pr-3 text-gray-900">
                    <span v-if="estadoPagoPorMetodo[m.id]?.estado" class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                      {{ estadoPagoPorMetodo[m.id].estado }}
                    </span>
                    <span v-else class="text-gray-500">—</span>
                  </td>
                  <td class="py-2 pr-3">
                    <button
                      type="button"
                      class="px-3 py-1.5 text-xs border rounded bg-white hover:bg-gray-50 text-gray-800"
                      :disabled="pagandoMetodoId === m.id"
                      @click="probarPago(m.id)"
                    >
                      {{ pagandoMetodoId === m.id ? 'Pagando…' : 'Probar pago' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

