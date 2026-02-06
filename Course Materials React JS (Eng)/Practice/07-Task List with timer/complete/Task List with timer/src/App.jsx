import { useEffect, useState } from "react";

/*Rus
//Задача:
//Добавьте функционал, который будет отслеживать, просрочена ли задача.
//Для отображения просроченной задачи добавьте к задаче класс overdue.

//ПОДРОБНЕЕ С ПОДСКАЗКАМИ:
//1 — Создайте состояние, которое отслеживает текущее время.
//2 — Создайте side effect, который будет обновлять состояние текущего времени каждую секунду.
//3 — Передайте динамически состояние, которое отслеживает текущее время, в компонент TaskItem (если deadline < текущее время, то true).
//4 — Добавьте элементу <li className="task-item"></li> класс overdue при условии, что deadline прошел.
*/

/*Eng
//Task:
//Add functionality to track whether a task is overdue.
//To display overdue tasks, add the class "overdue" to the task.

//DETAILS WITH HINTS:
//1 — Create a state that tracks the current time.
//2 — Create a side effect that updates the current time state every second.
//3 — Dynamically pass the state that tracks the current time to the TaskItem component (if deadline < current time, then true).
//4 — Add the "overdue" class to the <li className="task-item"></li> element if the deadline has passed.

*/

// The main App component
function App() {
  // State for storing tasks
  const [tasks, setTasks] = useState([]);
  // State for sorting type (e.g., by date or priority)
  const [sortType, setSortType] = useState("date");
  // State for sorting order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");
  // State for controlling visibility of sections
  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    completedTasks: true,
  });
  // State for tracking the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Side effect: Updates current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    // Cleanup function to clear the timer
    return () => clearInterval(timer);
  }, []);

  // Function to toggle visibility of specific sections
  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  // Function to add a new task
  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  // Function to delete a task by its ID
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Function to mark a task as completed
  function completeTask(id) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)));
  }

  // Function to sort tasks by priority or date
  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  // Function to toggle sort order or change sort type
  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  // Filter active and completed tasks, then sort them
  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTasks = sortTask(tasks.filter((task) => task.completed));

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task List with Priority</h1>
        {/* Button to toggle task form visibility */}
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {/* Show task form if open */}
        {openSection.taskList && <TaskForm addTask={addTask} />}
      </div>
      <div className="task-container">
        <h2>Tasks</h2>
        {/* Button to toggle task list visibility */}
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        {/* Sort controls */}
        <div className="sort-controls">
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
          >
            By Date {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}
          >
            By Priority {sortType === "priority" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
        </div>
        {/* Display active tasks */}
        {openSection.tasks && (
          <TaskList
            completeTask={completeTask}
            deleteTask={deleteTask}
            activeTasks={activeTasks}
            currentTime={currentTime}
          />
        )}
      </div>
      <div className="completed-task-container">
        <h2>Completed Task</h2>
        {/* Button to toggle completed tasks visibility */}
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
        {/* Display completed tasks */}
        {openSection.completedTasks && (
          <CompletedTaskList deleteTask={deleteTask} completedTasks={completedTasks} />
        )}
      </div>
      <Footer />
    </div>
  );
}

// Task form for adding new tasks
function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="datetime-local"
        required
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

// Task list for active tasks
function TaskList({ activeTasks, deleteTask, completeTask, currentTime }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          completeTask={completeTask}
          deleteTask={deleteTask}
          task={task}
          key={task.id}
          isOverdue={new Date(task.deadline) < currentTime}
        />
      ))}
    </ul>
  );
}

// List for completed tasks
function CompletedTaskList({ completedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

// Single task item with overdue status
function TaskItem({ task, deleteTask, completeTask, isOverdue }) {
  const { title, priority, deadline, id, completed } = task;

  return (
    <li className={`task-item ${priority.toLowerCase()} ${isOverdue ? "overdue" : ""}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">Due: {new Date(deadline).toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useEffect, useState, component
        composition, conditional rendering, array methods (map, filter), event handling.
      </p>
    </footer>
  );
}

export default App;
