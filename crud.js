document.getElementById("medicoForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  let fDateTime = fechaHora(); // Fecha de registro
  addMedico(nombre, email, fDateTime);
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
});

let currentRow; // Fila actual que se está editando

function addMedico(nombre, email, fecha) {
  const table = document.getElementById("medicoList");
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${fecha}</td>
        <td class="actions">
            <button class="edit" onclick="openModal(this)">Editar</button>
            <button class="turno" onclick="turnoMedico(this)">Turno</button>
        </td>
    `;
  table.appendChild(row);
}

function openModal(event) {
  const row = event.parentElement.parentElement;
  currentRow = row; // Guarda la fila actual

  // Cargar los datos actuales en los campos de la ventana modal
  document.getElementById("editNombre").value = row.children[0].textContent;
  document.getElementById("editEmail").value = row.children[1].textContent;

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
  if (confirm("¿Médico termina turno?")) {
    const row = event.parentElement.parentElement;
    row.style.backgroundColor = "#D3D3D3"; // Cambiar el color de la fila
  }
}

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

// Función para validar el formato del email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
