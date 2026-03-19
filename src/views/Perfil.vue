<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">

    <!-- LOGO FONDO -->
    <img 
      src="../../public/logo.jpeg"
      class="absolute opacity-5 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    />

    <!-- CONTENEDOR -->
    <div class="w-full max-w-3xl">

      <!-- BOTON VOLVER -->
      <button 
        @click="$router.back()"
        class="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition"
      >
        ← Volver
      </button>

      <!-- CARD -->
      <div class="bg-white shadow-xl rounded-2xl p-8">

        <!-- TITULO -->
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
          Información Personal
        </h1>

        <!-- FORM -->
        <form @submit.prevent="guardar" class="space-y-6">

          <!-- SUBTITULO -->
          <p class="text-sm font-semibold text-gray-600">
            Datos del usuario
          </p>

          <!-- Nombre y Apellido -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-600">Nombre</label>
              <input v-model="user.name" class="input" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600">Apellido</label>
              <input v-model="user.apellido" class="input" />
            </div>
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-semibold text-gray-600">Teléfono</label>
            <input v-model="user.telefono" class="input" />
          </div>

          <!-- Correo -->
          <div>
            <label class="block text-sm font-semibold text-gray-600">Correo</label>
            <input 
              v-model="user.email" 
              class="input bg-gray-100 text-gray-500 cursor-not-allowed" 
              disabled 
            />
          </div>

          <!-- DIRECCIÓN -->
          <p class="text-sm font-semibold text-gray-600 mt-4">
            Dirección de envío
          </p>

          <!-- Departamento y Municipio -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-600">Departamento</label>
              <select v-model="direccion.departamento" @change="filtrarMunicipios" class="input">
                <option value="">Seleccione departamento</option>
                <option v-for="d in departamentos" :key="d.nombre" :value="d.nombre">{{ d.nombre }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600">Municipio</label>
              <select v-model="direccion.municipio" class="input">
                <option value="">Seleccione municipio</option>
                <option v-for="m in municipiosFiltrados" :key="m">{{ m }}</option>
              </select>
            </div>
          </div>

          <!-- Calle / referencia -->
          <div>
            <label class="block text-sm font-semibold text-gray-600">Calle, colonia, referencia...</label>
            <input 
              v-model="direccion.calle" 
              class="input" 
              placeholder="Opcional" 
            />
          </div>

          <!-- BOTÓN -->
          <button 
            type="submit"
            class="w-full zippia-boton"
          >
            Guardar información
          </button>

        </form>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/services/api";

const authStore = useAuthStore();

// Usuario
const user = ref({
  name: "",
  apellido: "",
  telefono: "",
  email: ""
});

// Dirección
const direccion = ref({
  departamento: "",
  municipio: "",
  calle: ""
});

// Listado de departamentos y municipios de El Salvador
const departamentos = [
  { nombre: "Ahuachapán", municipios: ["Ahuachapán", "Apaneca", "Atiquizaya", "Concepción de Ataco", "El Refugio", "Guaymango", "Jujutla", "San Francisco Menéndez", "San Lorenzo", "San Pedro Puxtla", "Tacuba", "Turín"] },
  { nombre: "Santa Ana", municipios: ["Santa Ana", "Metapán", "Chalchuapa", "Coatepeque", "El Congo", "Masahuat", "Candelaria de la Frontera", "Texistepeque", "San Sebastián Salitrillo", "San Antonio Pajonal", "San Francisco Menéndez"] },
  { nombre: "San Salvador", municipios: ["San Salvador", "Mejicanos", "Soyapango", "Apopa", "Cuscatancingo", "Ilopango", "Ayutuxtepeque", "Tonacatepeque", "Rosario de Mora", "Nejapa"] },
];

const municipiosFiltrados = ref([]);

// Filtrar municipios según departamento
const filtrarMunicipios = () => {
  const dep = departamentos.find(d => d.nombre === direccion.value.departamento);
  municipiosFiltrados.value = dep ? dep.municipios : [];
  direccion.value.municipio = ""; // reinicia el municipio al cambiar departamento
};

// Guardar cambios en backend
const guardar = async () => {
  try {

    const payload = {
      name: user.value.name,
      apellido: user.value.apellido,
      telefono: user.value.telefono
    }

    if (
      direccion.value.departamento || direccion.value.municipio || direccion.value.calle
    ) {
      payload.direccion = direccion.value
    }

    const res = await api.put("/auth/user/update", payload)

    alert("Perfil actualizado correctamente")

    Object.assign(user.value, res.data.user)

    if (res.data.user.direccion) {
      Object.assign(direccion.value, res.data.user.direccion)
    }

    authStore.user = res.data.user

  } catch (error) {
    console.error("Error al guardar", error)
    alert("No se pudo guardar la información.")
  }
}

// Cargar usuario al montar
const cargarUsuario = async () => {
  try {
    if(authStore.user){
      Object.assign(user.value, authStore.user);
      if(authStore.user.direccion){
        Object.assign(direccion.value, authStore.user.direccion);
      }
    }

    const res = await api.get("/auth/me");
    Object.assign(user.value, res.data);
    if(res.data.direccion){
      Object.assign(direccion.value, res.data.direccion);
    }

  } catch (error) {
    console.error("Error cargando usuario", error);
  }
};

onMounted(() => {
  cargarUsuario();
});
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition;
}
</style>
