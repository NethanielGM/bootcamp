import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
const Todo = ({ todos, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    title: "",
  });
  const submitUpdate = (value, title) => {
    updateTodo(edit.id, value, title);
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
          })
        }
      >
        <h2>{todo.title}</h2>
        <p>{todo.text}</p>
        <br />
        {todo.createdDate == todo.createdDate ? (
          <span>date created:{todo.createdDate} </span>
        ) : (
          <div>
            <span>date edited:</span>
            <br />
            <span>date created:{todo.createdDate}</span>
          </div>
        )}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
};
export default Todo;
