// VARIABLES GENERALES Y ARRAY INICIAL CON 3 TAREAS 
let newTask = document.getElementById('input-newtask');
const btnNewTask = document.getElementById('btn-newtask');
let taskList = [
  { id: 1, taskName: 'Hacer el desafío de la semana', estado: true },
  { id: 2, taskName: 'Doblar la ropa', estado: false },
  { id: 3, taskName: 'Comprar secador de pelo', estado: false },
];

// FUNCION RENDERIZA HTML
const renderTaskList = (taskList) => {
  let html = '';

  taskList.forEach((task) => {

    const statusBtnIcon = task.estado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill';
    html += `<tr>
                <td>${task.id}</td>
                <td>${task.taskName}</td>
                <td><i class="${statusBtnIcon}" onclick="changeStatusTask(${task.id})"></i></td>
                <td><i class="bi bi-trash-fill" onclick="deleteTask(${task.id})"></i></td>
            </tr>`;
  });

  document.getElementById('task-list').innerHTML = html;
  document.getElementById('task-total').innerHTML = taskList.length;
  document.getElementById('task-closed').innerHTML = taskList.filter((task) => task.estado === true).length;
};

// FUNCION PARA CAMBIAR EL ESTADO DE LA TAREA

const changeStatusTask = (id) => {
  // Buscar la tarea por su ID
  const task = taskList.find(task => task.id === id);

  // Verificar si se encontró la tarea
  if (!task) {
    console.error(`No se encontró ninguna tarea con el ID ${id}`);
    return;
  }

  // Cambiar el estado de la tarea
  task.estado = !task.estado;

  // Renderizar la lista actualizada de tareas
  renderTaskList(taskList);
};


// FUNCION PARA ELIMINAR UNA TAREA

const deleteTask = (id) => {
  // Encontrar el índice de la tarea con el ID proporcionado
  const index = taskList.findIndex(task => task.id === id);

  // Verificar si se encontró la tarea
  if (index !== -1) {
    // Eliminar la tarea del array usando splice
    taskList.splice(index, 1);
    console.log(`Tarea con ID ${id} eliminada correctamente.`);
  } else {
    console.error(`No se encontró ninguna tarea con el ID ${id}. No se pudo eliminar.`);
  }

  // Renderizar la lista actualizada de tareas
  renderTaskList(taskList);
};


// FUNCION PARA GENERAR ID

const generarId = (taskList) => {
  // Obtener el último ID existente en la lista de tareas
  const lastId = taskList.length > 0 ? taskList[taskList.length - 1].id : 0;

  // Generar un nuevo ID sumando 1 al último ID existente
  const newId = lastId + 1;

  return newId;
};


// EVENTO QUE GENERA UNA NUEVA TAREA Y LA CARGA AL ARRAY
btnNewTask.addEventListener('click', () => {
 
  if (newTask.value.trim() !== '') {
  // Crear un objeto `task` con tres propiedades: id, taskName y estado
    const task = {
      id: generarId(taskList),
      taskName: newTask.value,
      estado: false,
    };
    
  // Agregar la nueva tarea al array `taskList`
    taskList.push(task);
  // Renderizar la lista actualizada de tareas
    renderTaskList(taskList);
  // Limpiar el campo newTask después de agregar la tarea
    newTask.value = '';
  // Poner el foco nuevamente en el campo newTask para facilitar la entrada de nuevas tareas
    newTask.focus();

  // Si el campo newTask está vacío, agregar la clase `is-invalid` para indicar un estado inválido
  } else {
    newTask.classList.add('is-invalid');
  }
});

// Evento para remover error al hacer click
newTask.addEventListener('click', () => {
  newTask.classList.remove('is-invalid');
});

// RENDERIZA LA LISTA DE TAREAS INICIAL
renderTaskList(taskList);