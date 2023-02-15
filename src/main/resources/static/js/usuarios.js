// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
  setUserEmailHTML();
});

async function cargarUsuarios(){
    const tableHTML = document.querySelector("#usuarios tbody");
    let listadoUsuariosHTML = '';

    const request = await fetch("api/usuarios",{
        method: "GET",
        headers: getHeaders()
    });

    const usuarios = await request.json();

    for(let usuario of usuarios){
        let usuarioHTML = `<tr>
                               <td>${usuario.id}</td>
                               <td>${usuario.nombre} ${usuario.apellido}</td>
                               <td>${usuario.email}</td>
                               <td>${usuario.telefono ? usuario.telefono : '-'}</td>
                               <td>
                                <a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarUsuario(${usuario.id})">
                                  <i class="fas fa-trash"></i>
                                </a>
                                </td>
                             </tr>`;
        listadoUsuariosHTML += usuarioHTML;
    }
    tableHTML.innerHTML = listadoUsuariosHTML;
}

async function eliminarUsuario(id){
    if(!confirm('¿Desea eliminar el usuario?')) return;

        const request = await fetch(`api/usuarios/${id}`,{
            method: "DELETE",
            headers: getHeaders()
        });
        cargarUsuarios();
}

function setUserEmailHTML(){
    document.querySelector("#label-email-usuario").outerHTML = localStorage.email;
}
function getHeaders(){
    return {
     "Accept": "application/json",
     "Content-Type": "application/json",
     "Authorization": localStorage.token
    }
}