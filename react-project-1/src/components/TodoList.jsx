import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import localforage from "localforage";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [archiveTodos, setArchive] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newTodo) => {
    if (!newTodo.text || /^\s*$/.test(newTodo.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newTodo : item))
    );
  };

  const removeTodo = (todoId) => {
    const removeArr = [...todos].filter((todo) => todo.id !== todoId);
    if (window.confirm("Are you sure you want to delete your note?"))
      setTodos(removeArr);
  };

  const archiveTodo = (todoId) => {
    const archiveArr = [...todos].filter((todo) => todo.id == todoId);
    const removeArr = [...todos].filter((todo) => todo.id !== todoId);
    if (window.confirm("Are you sure?")) setArchive(archiveArr);
    setTodos(removeArr);
  };

  useEffect(() => {
    localforage.getItem("somekey").then((value) => setTodos(value));
  }, []);

  useEffect(() => {
    localforage.setItem("somekey", todos);
  }, [todos]);

  return (
    <>
      <h1>Notes</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        archiveTodos={archiveTodos}
        archiveTodo={archiveTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
