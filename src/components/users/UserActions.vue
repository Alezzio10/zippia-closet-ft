<script setup>

import { ref, watch } from "vue"
import api from "../../services/api"

const props = defineProps({
  selectedUser: Object
})

const emit = defineEmits(["reload"])

const loading = ref(false)

/*LOS MODALES*/
const showCreateModal = ref(false)
const showEditModal = ref(false)

/*FORMULARIOS */
const newUser = ref({
  name: "",
  apellido: "",
  email: "",
  telefono: "",
  password: "",
  rol_id: ""
})

const editForm = ref({
  id: null,
  name: "",
  apellido: "",
  email: "",
  telefono: ""
})

/*ABRIR LOS MODALES*/
const openCreateModal = () => {

  newUser.value = {
    name: "",
    apellido: "",
    email: "",
    telefono: "",
    password: ""
  }

  showCreateModal.value = true
}

const openEditModal = () => {

  if(!props.selectedUser){
    alert("Seleccione un usuario primero")
    return
  }

  editForm.value = {
    id: props.selectedUser.id,
    name: props.selectedUser.name || "",
    apellido: props.selectedUser.apellido || "",
    email: props.selectedUser.email || "",
    telefono: props.selectedUser.telefono || ""
  }

  showEditModal.value = true
}

/*CREAMOS EL USUARIO*/
const saveUser = async () => {

  try{

    loading.value = true

    await api.post("/users", newUser.value)

    showCreateModal.value = false

    emit("reload")

  }catch(error){

    console.error(error)
    alert("Error al crear usuario")

  }finally{
    loading.value = false
  }
  if(
 !newUser.value.name ||
 !newUser.value.apellido ||
 !newUser.value.email ||
 !newUser.value.password ||
 !newUser.value.rol_id
){
 alert("Complete todos los campos obligatorios")
 return
}

}

/*EDITAR EL USUARIO*/
const updateUser = async () => {

  try{

    loading.value = true

    await api.put(`/users/${editForm.value.id}`, editForm.value)

    showEditModal.value = false

    emit("reload")

  }catch(error){

    console.error(error)
    alert("Error al actualizar usuario")

  }finally{
    loading.value = false
  }

}

/*ELIMINAR USUARIO*/
const deleteUser = async () => {

  if(!props.selectedUser){
    alert("Seleccione un usuario primero")
    return
  }

  if(!confirm("¿Seguro que desea eliminar este usuario?")) return

  try{

    loading.value = true

    await api.delete(`/users/${props.selectedUser.id}`)

    emit("reload")

  }catch(error){

    console.error(error)
    alert("Error al eliminar usuario")

  }finally{
    loading.value = false
  }

}

</script>

<template>

<div class="bg-white shadow-md rounded-xl p-4 mt-4 border border-gray-200">

<!-- titulo -->

<div class="flex items-center justify-between mb-4">

<h3 class="text-lg font-semibold text-gray-700 flex items-center gap-2">

<i class="pi pi-cog text-[#7F82A6]"></i>
Acciones de Usuario

</h3>

<span
v-if="selectedUser"
class="text-sm bg-gray-100 px-3 py-1 rounded"
>

ID: {{ selectedUser.id }}

</span>

</div>


<!-- botones -->

<div class="flex gap-3 flex-wrap">

<button
@click="openCreateModal"
class="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7F82A6] hover:opacity-90 text-white transition shadow"
>

<i class="pi pi-user-plus"></i>
Agregar Usuario

</button>


<button
@click="openEditModal"
class="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition shadow"
>

<i class="pi pi-pencil"></i>
Editar Usuario

</button>


<button
@click="deleteUser"
class="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition shadow"
>

<i class="pi pi-trash"></i>
Eliminar Usuario

</button>

</div>


<!-- indicador usuario seleccionado -->

<div
v-if="selectedUser"
class="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded"
>

Usuario seleccionado:
<strong>

{{ selectedUser.name }}

</strong>

</div>

</div>

<!--MODAL PARA CREAR EL USUARIO-->

<div
v-if="showCreateModal"
class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
>

<div class="bg-white w-[420px] rounded-xl shadow-xl p-6">

<h2 class="text-xl font-bold mb-4 text-[#7F82A6]">
Crear Usuario
</h2>

<div class="space-y-3">

<input v-model="newUser.name" placeholder="Nombre"
class="w-full border rounded p-2"/>

<input v-model="newUser.apellido" placeholder="Apellido"
class="w-full border rounded p-2"/>

<input v-model="newUser.email" placeholder="Correo"
class="w-full border rounded p-2"/>

<input v-model="newUser.telefono" placeholder="Teléfono"
class="w-full border rounded p-2"/>

<input v-model="newUser.password" type="password"
placeholder="Contraseña"
class="w-full border rounded p-2"/>

<select
v-model="newUser.rol_id"
class="w-full border rounded p-2"
>
<option value="" placeholder="Seleccione un Rol">Seleccione un rol</option>
<option value="1">Administrador</option>
<option value="2">Cliente</option>
</select>

</div>

<div class="flex justify-end gap-3 mt-5">

<button
@click="showCreateModal=false"
class="px-4 py-2 bg-gray-300 rounded"
>
Cancelar
</button>

<button
@click="saveUser"
class="px-4 py-2 bg-[#7F82A6] text-white rounded hover:opacity-90"
>
Guardar
</button>

</div>

</div>

</div>


<!-- MODAL EDITAR USUARIO-->
<div
v-if="showEditModal"
class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
>

<div class="bg-white w-[420px] rounded-xl shadow-xl p-6">

<h2 class="text-xl font-bold mb-4 text-[#7F82A6]">
Editar Usuario
</h2>

<div class="space-y-3">

<input v-model="editForm.name" placeholder="Nombre"
class="w-full border rounded p-2"/>

<input v-model="editForm.apellido" placeholder="Apellido"
class="w-full border rounded p-2"/>

<input v-model="editForm.email" placeholder="Correo"
class="w-full border rounded p-2"/>

<input v-model="editForm.telefono" placeholder="Teléfono"
class="w-full border rounded p-2"/>

</div>

<div class="flex justify-end gap-3 mt-5">

<button
@click="showEditModal=false"
class="px-4 py-2 bg-gray-300 rounded"
>
Cancelar
</button>

<button
@click="updateUser"
class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
>
Actualizar
</button>

</div>

</div>

</div>

</template>