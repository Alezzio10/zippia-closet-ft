import Swal from "sweetalert2"

export const alerts = {

success(message){
Swal.fire({
icon: "success",
title: "Éxito",
text: message,
confirmButtonColor: "#7F82A6"
})
},

error(message){
Swal.fire({
icon: "error",
title: "Error",
text: message,
confirmButtonColor: "#d33"
})
},

warning(message){
Swal.fire({
icon: "warning",
title: "Advertencia",
text: message,
confirmButtonColor: "#f59e0b"
})
},

async confirm(message){

const result = await Swal.fire({
title: "Confirmar acción",
text: message,
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#d33",
cancelButtonColor: "#3085d6",
confirmButtonText: "Sí",
cancelButtonText: "Cancelar"
})

return result.isConfirmed

}

}