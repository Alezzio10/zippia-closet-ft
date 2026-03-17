<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">

    <div class="w-full max-w-xl p-10 bg-white shadow-lg">

      <h2 class="text-3xl text-center font-serif text-gray-800 mb-8">
        INICIAR SESIÓN
      </h2>

      <div v-if="errorMessage"
        class="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="sendLogin" class="space-y-6">

        <div>
          <label class="block text-lg font-serif text-gray-700 mb-2">
            Correo electrónico
          </label>

          <input
            v-model="form.email"
            type="email"
            required
            class="w-full border border-gray-400 bg-gray-100 px-4 py-2"
          />
        </div>

        <div>
          <label class="block text-lg font-serif text-gray-700 mb-2">
            Contraseña
          </label>

          <input
            v-model="form.password"
            type="password"
            required
            class="w-full border border-gray-400 bg-gray-100 px-4 py-2"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gray-600 zippia-boton"
        >
          {{ loading ? "Ingresando..." : "INICIAR SESIÓN" }}
        </button>

      </form>

      <p class="mt-6 text-center text-sm text-gray-700">
        ¿No tienes cuenta?
        <router-link
          to="/register"
          class="underline text-blue-600"
        >
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






















