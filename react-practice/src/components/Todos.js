import React from "react";
import TodoItem from "./TodoItem";

const Todos = ({ todos, onDelete }) => {
  return (
    <div className="container my-3" style={{ minHeight: "70vh" }}>
      <h3 className="text-left">Todos List</h3>
      {todos.length === 0 && (
        <p className="text-muted text-center">No todos to display 😴</p>
      )}
      {todos.map((item) => (
        <TodoItem key={item.srno} todo={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Todos;
