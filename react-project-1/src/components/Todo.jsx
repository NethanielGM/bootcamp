import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";

const Todo = ({ todos, removeTodo, updateTodo, archiveTodos, archiveTodo }) => {
  console.log("archiveTodos", archiveTodos);
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    title: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
      title: "",
    });
  };

  if (edit.id) {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <TodoForm edit={edit} onSubmit={submitUpdate} />
        </div>
      </div>
    );
  }

  return todos.map((todo, index) => (
    <div className="todo-row" key={index}>
      <div
        className="card"
        key={todo.id}
        onClick={() =>
          setEdit({
            id: todo.id,
            value: todo.text,
            title: todo.title,
            dateAdded: todo.dateAdded,
          })
        }
      >
        <h2>{todo.title}</h2>
        <p>{todo.text}</p>
        <br />
        <div>
          <span>{todo.date}</span>
          <br />
          <span>{todo.dateAdded}</span>
        </div>
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => archiveTodo(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;
