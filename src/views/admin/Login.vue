<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
      <div v-if="errorMessage" class="mb-4 p-3 text-sm text-red-600 bg-red-100 rounded-lg">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="sendLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Password </label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {{ loading ? "Ingresando..." : "Ingresar" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-blue-600 hover:underline font-medium">
          Regístrate
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
//definiendo variables de estado
const loading = ref(false);
const errorMessage = ref(null);

const form = reactive({
  email: "",
  password: "",
});

//función para enviar peticion
const sendLogin = async () => {
  loading.value = true;
  errorMessage.value = null;
  try {
    await authStore.login(form);
  } catch (err) {
    if(err.response.status===401){
        const {message} = err.response.data;
        errorMessage.value = message;
    }
    
  } finally {
    loading.value = false;
  }
};
</script>