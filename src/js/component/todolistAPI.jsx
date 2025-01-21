import React, { useState, useEffect } from "react";


const ToDoList = () => {
  const [toDos, setToDos] = useState([]);
  const [task, setTask] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const getTasks = async ()=>{
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/irene_batlle')
      console.log(response);
      if (!response.ok){
        createUser();
      }

      const data = await response.json();
      console.log (data);
      setToDos(data.todos);
    } catch (error) {
      
    }
  }


  //primero de todo crear el usuario de la API
  const createUser = async() =>{
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/irene_batlle', {method: "POST"})
      console.log(response);
      if (!response.ok){
        throw new Error ("Error al crear el usuario")
      }
      const data = await response.json();
      console.log (data);
      getTasks();
    } catch (error) {
      
    }
  }


  //crear una tarea en la API
  const createTask = async() =>{
    try {
      const response = await fetch('https://playground.4geeks.com/todo/todos/irene_batlle', {
      method: "POST",
      body: JSON.stringify({
        "label":task,
        "is_done": false,
      }), 
      headers:{
        "Content-Type": "application/json"
      }
    })
      console.log(response);
      if (!response.ok){
        throw new Error ("Error al crear la tarea")
      }
      const data = await response.json();
      console.log (data);
      getTasks();
      setTask("");
    } catch (error) {
      
    }
  }

  //eliminar tarea de la API
  const removeTaskAPI = async (id) =>{
    try{
      const response = await fetch (`https://playground.4geeks.com/todo/todos/${id}`,{
        method: "DELETE", 
        headers:{
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) throw new Error ("HTTP error" + response.statusText)
    }catch (error){
  console.log(error);
}
  }


//useEffect para cargar las tareas nada más empezar
  useEffect(()=>{
    getTasks();

  }, [])

  //funciones para la aplicación

  const deleteTask = async (id) => {
    await removeTaskAPI(id);
    getTasks(); 
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTask();
    }
  };
  const toggleCompletion = (index) => {
    setToDos(
      toDos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

//contar las tareas
  //const activeTasksCount = toDos.filter((todo) => !todo.isCompleted).length;

//renderizar frase tareas pendientes
  const renderContent = () => {
    if (toDos.length===1) {
      return <p>Hay una tarea pendiente</p>;
    } else if (toDos.length=== 0) {
      return <p>No hay tareas pendientes</p>;
    } else {
      return <p>Hay {toDos.length} tareas pendientes</p>;
    }
  };


  return (
    <div className="text-center">
      <h1>Lista de tareas</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Añadir tarea"
      />
      <ul>
      {toDos.map((todo) => (
  <li
    key={todo.id}
    onMouseEnter={() => setHoveredIndex(todo.id)}
    onMouseLeave={() => setHoveredIndex(null)}
    className="todo-item"
  >
    {todo.label}
    {hoveredIndex === todo.id && (
      <button onClick={() => deleteTask(todo.id)} className="delete-button">
        <i className="fa-solid fa-trash"></i>
      </button>
    )}
  </li>
))}

      </ul>
	  <div>
      {renderContent()}
    </div>
    </div>
  );
};

export default ToDoList;
