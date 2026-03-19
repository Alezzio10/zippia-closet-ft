<template>
   <img 
  src="/public/logo.jpeg"
  class="absolute opacity-5 w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
/>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    
    <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
      
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Crear Usuario
      </h2>

      <form @submit.prevent="sendRegister" class="space-y-5">

       
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="form.name" type="text" class="input w-full" />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name[0] }}
          </p>
        </div>

       
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input v-model="form.apellido" type="text" class="input w-full" />
          <p v-if="errors.apellido" class="text-red-500 text-sm">
            {{ errors.apellido[0] }}
          </p>
        </div>

       
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input v-model="form.telefono" type="text" class="input w-full" />
          <p v-if="errors.telefono" class="text-red-500 text-sm">
            {{ errors.telefono[0] }}
          </p>
        </div>

        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
          <input v-model="form.email" type="email" class="input w-full" />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email[0] }}
          </p>
        </div>

       
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input v-model="form.password" type="password" class="input w-full" />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password[0] }}
          </p>
        </div>

       
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
          <input v-model="form.password_confirmation" type="password" class="input w-full" />
        </div>

        
        <div v-if="errorMessage" class="text-red-600 text-sm">
          {{ errorMessage }}
        </div>

        
        <button
          type="submit"
          :disabled="loading"
          class="w-full zippia-boton"
        >
          {{ loading ? "Registrando..." : "Registrarse" }}
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const loading = ref(false);
const errorMessage = ref("");
const errors = ref({});

const form = reactive({
  name: "",
  apellido: "",
  telefono: "",
  email: "",
  password: "",
  password_confirmation: ""
});

const sendRegister = async () => {
  loading.value = true;
  errorMessage.value = "";
  errors.value = {};

  try {
    await authStore.register(form);
  } catch (error) {
    if (error.response?.status === 422) {
      errors.value = error.response.data;
    } else {
      errorMessage.value = "Error al registrar usuario";
      console.error(error);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input {
  @apply px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none;
}
</style>