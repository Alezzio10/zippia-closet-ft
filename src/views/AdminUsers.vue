<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 p-6">

<h1 class="text-black 3xl mb-4">
Gestion de Usuarios
</h1>

<UsersFilters
@filter="filters = $event"
/>

<UsersTable
:users="users"
:filters="filters"
@select="selectedUser = $event"
/>

<UsersActions
:selectedUser="selectedUser"
@reload="loadUsers"
/>

</div>

</div>

</template>

<script setup>

import Sidebar from "../components/layouts/Sidebar.vue"
import UsersFilters from "../components/users/UsersFilters.vue"
import UsersTable from "../components/users/UsersTable.vue"
import UsersActions from "../components/users/UserActions.vue"
import { ref, onMounted } from "vue"
import api from "../services/api"

const users = ref([])
const selectedUser = ref(null)
const filters = ref({})

const loadUsers = async () => {
  try{
    const res = await api.get("/users")
    users.value = res.data
  }catch(error){
    console.error(error)
  }
}

onMounted(loadUsers)

</script>