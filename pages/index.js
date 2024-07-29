// pages/index.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewToDo';
import TaskItem from '../components/TaskItem';

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (newTodo) => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodoItem = { id: newId, title: newTodo };
    setTodos([...todos, newTodoItem]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newTitle) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  const handleMoveUp = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      setTodos(updatedTodos);
    }
  };

  const handleMoveDown = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index + 1];
      updatedTodos[index + 1] = temp;
      setTodos(updatedTodos);
    }
  };

  return (
    <Layout onSave={() => localStorage.setItem('todos', JSON.stringify(todos))}>
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
      <NewTodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
      <TaskItem />
    </Layout>
  );
};

export default Home;
