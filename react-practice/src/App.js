import Header from "./components/Header";
import Todos from "./components/Todos";
import Footer from "./components/Footer";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
function App() {
  const [todos, setTodos] = useState([
    {
      srno: 1,
      title: "Go to Market",
      desc: "Go to Market to buy vegetabes",
    },
    {
      srno: 2,
      title: "Office time",
      desc: "Rush to Office",
    },
  ]);

  /* 
  prev is the old todos because:
  React passes the current state into your updater function
  This avoids stale state bugs
  It’s the safest, pro-level way to update state
  */
  const onDelete = (todo) => {
    setTodos((prev) => {
      console.log("Old todos:", prev);
      return prev.filter((item) => item.srno !== todo.srno);
    });
  };

  const addTodo = (title, desc) => {
    const newTodo = {
      srno: todos.length + 1,
      title: title,
      desc: desc,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <Header title="Todo List" searchBar={false} />
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </div>
  );
}

export default App;
