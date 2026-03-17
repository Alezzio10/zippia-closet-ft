<template>

<table class="w-full bg-white text-black">

<thead class="bg-primary text-black">
<tr>
<th class="p-2">ID</th>
<th class="p-2">Usuario</th>
<th class="p-2">Nombre</th>
<th class="p-2">Apellido</th>
<th class="p-2">Correo</th>
<th class="p-2">Telefono</th>
<th class="p-2">Rol</th>
</tr>
</thead>

<tbody>
<tr v-for="user in filteredUsers" :key="user.id" @click="emit('select', user)" class="border-b bg-white">

<td class="p-2">{{ user.id }}</td>
<td class="p-2">{{ user.name }} {{ user.apellido }}</td>
<td class="p-2">{{ user.name }}</td>
<td class="p-2">{{ user.apellido || '-' }}</td>
<td class="p-2">{{ user.email }}</td>
<td class="p-2">{{ user.telefono || '-' }}</td>
<td class="p-2">{{ user.rol_id == 1 ? "Administrador" : "Cliente" }}</td>

</tr>
</tbody>

</table>

</template>

<script setup>

import { ref, onMounted } from "vue"
import api from "../../services/api"
import { computed } from "vue"

const props = defineProps({
  users: Array,
  filters: Object
})

const emit = defineEmits(["select"])

const filteredUsers = computed(() => {

  return props.users.filter(user => {

    return (
      (!props.filters.nombre || user.name?.toLowerCase().includes(props.filters.nombre.toLowerCase())) &&

      (!props.filters.apellido || user.apellido?.toLowerCase().includes(props.filters.apellido.toLowerCase())) &&

      (!props.filters.telefono || user.telefono?.includes(props.filters.telefono)) &&

      (!props.filters.email || user.email?.toLowerCase().includes(props.filters.email.toLowerCase())) &&

      (!props.filters.id || user.id == props.filters.id) &&

      (!props.filters.rol || user.rol_id == props.filters.rol)

    )
  })

})

const users = ref([])

const loadUsers = async () => {

 try{

   const res = await api.get("/users")

   console.log(res.data)

   users.value = res.data

 }catch(error){

   console.error("Error cargando usuarios:", error)

 }

}

onMounted(loadUsers)

</script>