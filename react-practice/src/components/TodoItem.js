import React from "react";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div>
      <h5>{todo.title}</h5>
      <p>{todo.desc}</p>
      <button
        onClick={() => onDelete(todo)}
        type="button"
        class="btn btn-sm btn-danger"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
