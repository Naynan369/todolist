// components/TodoList.js
import { useState } from 'react';
import TaskItem from './TaskItem';

const TodoList = ({ todos, onDelete, onEdit, onMoveUp, onMoveDown }) => {
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleToggleComplete = (id) => {
    if (completedTodos.includes(id)) {
      setCompletedTodos(completedTodos.filter(todoId => todoId !== id));
    } else {
      setCompletedTodos([...completedTodos, id]);
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (completedTodos.includes(a.id) && !completedTodos.includes(b.id)) {
      return 1;
    } else if (!completedTodos.includes(a.id) && completedTodos.includes(b.id)) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div className="divide-y divide-gray-200">
      {sortedTodos.map((todo) => (
        <TaskItem
          key={todo.id}
          task={todo}
          completed={completedTodos.includes(todo.id)}
          onEdit={onEdit}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={onDelete}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
