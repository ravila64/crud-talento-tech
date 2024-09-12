import { appendFile } from 'fs';

document.getElementById("medicoForm").addEventListener("submit", function (e) {
  e.preventDefault(); // hace que no se envie el form
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  //const fechaRegistro = new Date().toDateString();
  let fDateTime = fechaHora();
  addMedico(nombre, email, fDateTime);
  // agrega registro al archivo
  datos.agregarRegistro(nombre,email,fecha);
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
});


// Función para agregar un registro al archivo
function agregarRegistro(nombre, email, fecha) {
  // Creamos la cadena de texto que se va a guardar
  const registro = `Nombre: ${nombre}, Email: ${email}, Fecha: ${fecha}\n`;

  // Usamos el método appendFile para agregar el registro al archivo
  appendFile('datos.txt', registro, (err) => {
      if (err) {
          console.error('Error al escribir en el archivo:', err);
      } else {
          console.log('Registro agregado con éxito.');
      }
  });
}

function addMedico(nombre, email, fecha) {
  const table = document.getElementById("medicoList");
  const row = document.createElement("tr");
  nombre = converterToCamelCase(nombre);
  row.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${fecha}</td>
        <td class="actions">
            <button class="edit" onclick="editMedico(this)">Edit-Name</button>
            <button class="edit" onclick="editEmail(this)">Edit-Email</button>
            <button class="turno" onclick="turnoMedico(this)">Turno</button>
        </td>
    `;
  table.appendChild(row);
}

function activeMedico(event) {}

function editMedico(event) {
  const row = event.parentElement.parentElement;
  let nombre = prompt(
    "Edita el nombre del médico:",
    row.children[0].textContent
  );
 // nombre = converterToCamelCase(row.children[0].textContent);
  nombre = converterToCamelCase(nombre);
  if (nombre) {
    row.children[0].textContent = nombre;
  }
}

function editEmail(event) {
  const row = event.parentElement.parentElement;
  let email = prompt(
    "Edita el email del médico:",
    row.children[1].textContent
  );
  if (email) {
    row.children[1].textContent = email;
  }
}

function turnoMedico(event) {
  if (confirm("¿Médico termina turno?", "yes","No")) {
    const row = event.parentElement.parentElement;
    // proceso de colorear fila y cambiar letrero y color del boton
    // row.remove();
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
  return str; // imprime desde pos 1  str.slice(1)
}

function displayDate() {
  let fDateTime = fechaHora();
  document.getElementById("fecha").innerHTML = fDateTime; //Date().toString();
  document.getElementById("fecha").style.fontSize = "20px";
  document.getElementById("fecha").style.color = "white";
  document.getElementById("fecha").style.backgroundColor="blue";
  document.getElementById("fecha").style.padding="15px";
}

function fechaHora(){
  let date = new Date().toString();
  console.log(date);
  let pos=date.indexOf('GMT');
  date = date.substring(0,pos);
  console.log("fecha ", typeof date);
  return date;
}