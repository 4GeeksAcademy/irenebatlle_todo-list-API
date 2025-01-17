import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [toDos, setToDos] = useState([]);
  const [task, setTask] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const apiURL = "https://playground.4geeks.com/todo/todos/irene_batlle";

  // Cargar las tareas al iniciar el componente
  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar las tareas");
        return response.json();
      })
      .then((data) => {
        setToDos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Añadir una tarea
  const addTask = () => {
    if (task.trim() !== "") {
      const updatedToDos = [...toDos, { text: task, isCompleted: false }];
      setToDos(updatedToDos);

      fetch(apiURL, {
        method: "PUT",
        body: JSON.stringify(updatedToDos),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al guardar la tarea");
          return response.json();
        })
        .then((data) => {
          console.log("Tarea añadida:", data);
        })
        .catch((error) => console.error("Error:", error));

      setTask("");
    }
  };

  // Eliminar una tarea
  const deleteTask = (index) => {
    const updatedToDos = toDos.filter((_, i) => i !== index);
    setToDos(updatedToDos);

    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(updatedToDos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar la tarea");
        return response.json();
      })
      .then((data) => {
        console.log("Tarea eliminada:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Alternar el estado de completado
  const toggleCompletion = (index) => {
    const updatedToDos = toDos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setToDos(updatedToDos);

    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(updatedToDos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar la tarea");
        return response.json();
      })
      .then((data) => {
        console.log("Tarea actualizada:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const activeTasksCount = toDos.filter((todo) => !todo.isCompleted).length;

  const renderContent = () => {
    if (activeTasksCount === 1) {
      return <p>Hay una tarea pendiente</p>;
    } else if (activeTasksCount === 0) {
      return <p>No hay tareas pendientes</p>;
    } else {
      return <p>Hay {activeTasksCount} tareas pendientes</p>;
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
        {toDos.map((todo, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="todo-item"
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.text}
            {hoveredIndex === index && (
              <button
                onClick={() => deleteTask(index)}
                className="delete-button"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ToDoList;
