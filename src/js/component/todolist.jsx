import React, { useState } from "react";


const ToDoList = () => {
  const [toDos, setToDos] = useState([]);
  const [task, setTask] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const addTask = () => {
    if (task.trim() !== "") {
      setToDos([...toDos, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setToDos(toDos.filter((_, i) => i !== index)); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  const toggleCompletion = (index) => {
    setToDos(
      toDos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };


  const activeTasksCount = toDos.filter((todo) => !todo.isCompleted).length;


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
        {toDos.map((todo, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="todo-item" 
          >
            {todo}
            {hoveredIndex === index && (
              <button onClick={() => deleteTask(index)}  className="delete-button">
                <i class="fa-regular fa-square-minus"></i>
              </button>
            )}
          </li>
        ))}
      </ul>
	  <p> Hay {activeTasksCount} tareas pendientes</p>
    </div>
  );
};

export default ToDoList;
