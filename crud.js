document.getElementById("medicoForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  if (!isEmailUnique(email)) {
    alert("El correo ya ha sido registrado. Por favor ingrese un correo diferente.");
    return;
  }
  let fDateTime = fechaHora(); // Fecha de registro
  addMedico(nombre, email, fDateTime);
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  // Verificar si el email ya está registrado
});

let currentRow; // Fila actual que se está editando
let emailList = [];  // lista de corresos registrados

function addMedico(nombre, email, fecha) {
  const table = document.getElementById("medicoList");
  const row = document.createElement("tr");
  nombre = converterToCamelCase(nombre);
  row.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${fecha}</td>
        <td class="actions">
            <button class="edit" id="btn_edit" onclick="openModal(this)">Editar</button>
            <button class="turno" onclick="turnoMedico(this)">En turno</button>
        </td>
    `;
  table.appendChild(row);
   // Agregar el correo a la lista de correos registrados
   emailList.push(email);
}

// Función para validar que el email sea único (no esté registrado previamente)
function isEmailUnique(email) {
  return !emailList.includes(email);
}

function openModal(event) {
  const rowModal = event.parentElement.parentElement;
  currentRow = rowModal; // Guarda la fila actual
  // Cargar los datos actuales en los campos de la ventana modal
  document.getElementById("editNombre").value = rowModal.children[0].textContent;
  document.getElementById("editEmail").value = rowModal.children[1].textContent;
  // Mostrar la ventana modal
  document.getElementById("editModal").style.display = "block";
}

document.getElementById("saveEditBtn").addEventListener("click", function () {
  // Obtener los valores actualizados desde la ventana modal
  const nuevoNombre = document.getElementById("editNombre").value;
  const nuevoEmail = document.getElementById("editEmail").value;
  // Validar el nuevo email
  if (!validateEmail(nuevoEmail)) {
    alert("Por favor ingrese un email válido.");
    return;
  }
  // if (!isEmailUnique(nuevoEmail)) {
  //   alert("El correo ya ha sido registrado. Por favor ingrese un correo diferente.");
  //   return;
  // }
  // Actualizar la fila con los nuevos valores
  currentRow.children[0].textContent = converterToCamelCase(nuevoNombre);
  currentRow.children[1].textContent = nuevoEmail;
  // Cerrar la ventana modal
  closeModal();
});

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function turnoMedico(event) {
  const row = event.parentElement.parentElement;
  const button = event; // El botón clickeado
  
  if (confirm("¿Médico termina turno?")) {
    // Cambiar color de la fila
    row.style.backgroundColor = "#77dbe2";
    // Cambiar el texto del botón
    button.textContent = "Turno Terminado";
    // Cambiar el color del botón
    button.style.backgroundColor = "#D3D3D3"; // Color gris claro
    button.style.color = "#000"; // Texto en negro
    // Desactivar el botón de turno para que no se pueda volver a hacer clic
    button.disabled = true;
    button.style.cursor = 'none';
    // Ocultar el botón de editar solo en la misma fila
    const editButton = row.querySelector('.edit');
    if (editButton) {
      editButton.style.display = 'none';
    }
    
  } else {
    row.style.backgroundColor = "#f4f4f4";
  }
 
}
    
// convierte el nombre a Camel Case
function converterToCamelCase(texto) {
  let str = "";
  let blanco = false;
  for (let i = 0; i < texto.length; i++) {
    const element = texto[i];
    if (i === 0 || blanco) {
      str += element.toUpperCase();
      blanco = false;
    } else {
      if (element === " ") {
        blanco = true;
        str += " ";
      } else {
        str += element.toLowerCase();
      }
    }
  }
  return str;
}

function fechaHora() {
  let date = new Date().toString();
  let pos = date.indexOf("GMT");
  date = date.substring(0, pos);
  return date;
}

function displayDate() {
  let fDateTime = fechaHora();
  let h2Fecha = document.getElementById("fecha");
  h2Fecha.innerHTML = fDateTime; //Date().toString();
  h2Fecha.style.fontSize = "14px";
  h2Fecha.style.color = "white";
  h2Fecha.style.backgroundColor="#1c60dd";
  h2Fecha.style.padding="12px";
  h2Fecha.style.borderRadius="5px";
  h2Fecha.style.collor="white";
}

// Función para validar el formato del email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Función para validar que el email sea único (no esté registrado previamente)
function isEmailUnique(email) {
  return !emailList.includes(email);
}

