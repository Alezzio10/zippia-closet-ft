<template>

<div class="flex gap-4 mt-6">

<button
@click="addCategoria"
class="bg-[#7F82A6] text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition"
>
<i class="pi pi-plus"></i>
Añadir
</button>

<button
@click="editCategoria"
:disabled="!selectedCategoria"
class="bg-amber-400 text-black px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
>
<i class="pi pi-pencil"></i>
Editar
</button>

<button
@click="deleteCategoria"
:disabled="!selectedCategoria"
class="bg-red-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:scale-105 transition disabled:opacity-40"
>
<i class="pi pi-trash"></i>
Eliminar
</button>

</div>

</template>

<script setup>

import axios from "axios"
import Swal from "sweetalert2"
import { alerts } from "../../utils/alerts"

const props = defineProps({
selectedCategoria:Object
})

const emit = defineEmits(["reload"])

const API = "http://localhost:8000/api/categorias"


/* ===============================
   AGREGAR CATEGORIA
================================*/

async function addCategoria(){

try{

const {value:form}=await Swal.fire({

title:"Nueva Categoría",

html:`
<input id="nombre" class="swal2-input" placeholder="Nombre">
<input id="descripcion" class="swal2-input" placeholder="Descripción">
`,

confirmButtonColor:"#7F82A6",

focusConfirm:false,

preConfirm:()=>{

return{

nombre_categoria:document.getElementById("nombre").value,
descripcion_categoria:document.getElementById("descripcion").value

}

}

})

if(!form) return

await axios.post(API,form)

alerts.success("Categoría creada correctamente")

emit("reload")

}catch(error){

alerts.error("Error al crear la categoría")

}

}


/* ===============================
   EDITAR CATEGORIA
================================*/

async function editCategoria(){

if(!props.selectedCategoria) return

const cat = props.selectedCategoria

try{

const {value:form}=await Swal.fire({

title:"Editar Categoría",

html:`
<input id="nombre" class="swal2-input" value="${cat.nombre_categoria}">
<input id="descripcion" class="swal2-input" value="${cat.descripcion_categoria}">
`,

confirmButtonColor:"#7F82A6",

focusConfirm:false,

preConfirm:()=>{

return{

nombre_categoria:document.getElementById("nombre").value,
descripcion_categoria:document.getElementById("descripcion").value

}

}

})

if(!form) return

await axios.put(`${API}/${cat.id}`,form)

alerts.success("Categoría actualizada")

emit("reload")

}catch(error){

alerts.error("Error al actualizar la categoría")

}

}


/* ===============================
   ELIMINAR CATEGORIA
================================*/

async function deleteCategoria(){

if(!props.selectedCategoria) return

try{

const confirm = await alerts.confirm("¿Eliminar esta categoría?")

if(!confirm) return

await axios.delete(`${API}/${props.selectedCategoria.id}`)

alerts.success("Categoría eliminada")

emit("reload")

}catch(error){

alerts.error("Error al eliminar la categoría")

}

}

</script>