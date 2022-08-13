import React, { useState } from "react";
import { nanoid } from "nanoid";
import { RiCloseCircleLine } from "react-icons/ri";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [title, setTitle] = useState(props.edit ? props.edit.title : "");

  const handleText = (e) => {
    setInput(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleUpdate = (e) => {
    const date = new Date().toUTCString();
    e.preventDefault();
    props.onSubmit({
      id: nanoid(),
      text: input,
      title: title,
      date: date,
      dateAdded: props.edit.dateAdded,
    });
    setInput("");
    setTitle("");
  };

  const handleTodo = (e) => {
    const date = new Date().toUTCString();
    e.preventDefault();
    props.onSubmit({
      id: nanoid(),
      text: input,
      title: title,
      dateAdded: date,
    });
    setInput("");
    setTitle("");
  };

  const closeModal = () => {
    props.onSubmit({});
  };

  return (
    <form className="todo-form">
      {props.edit ? (
        <>
          <div className="icons">
            <RiCloseCircleLine onClick={closeModal} className="delete-icon" />
          </div>
          <input
            placeholder="Title"
            value={title}
            onChange={handleTitle}
            name="title"
            className="todo-input"
          />
          <br />
          <textarea
            placeholder="Update your note"
            value={input}
            onChange={handleText}
            name="text"
            className="todo-input"
            rows="10"
            cols="10"
          />
          <br />
          <button onClick={handleUpdate} className="todo-button">
            update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Title"
            value={title}
            onChange={handleTitle}
            name="title"
            className="todo-input"
          />
          <textarea
            placeholder="Add a note"
            value={input}
            onChange={handleText}
            name="text"
            className="todo-input"
            rows="10"
            cols="10"
          />
          <br />
          <button onClick={handleTodo} className="todo-button">
            add
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
