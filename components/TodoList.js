// components/TodoList.js
import TaskItem from './TaskItem';

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete, onMoveUp, onMoveDown }) => {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  if (todos.length === 0) {
    return (
      <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500">
        No tasks yet. Add a task to get started and keep your day organized.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {sortedTodos.map((todo, index) => (
        <TaskItem
          key={todo.id}
          task={todo}
          completed={todo.completed}
          onEdit={onEdit}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          isFirst={index === 0}
          isLast={index === sortedTodos.length - 1}
        />
      ))}
    </div>
  );
};

export default TodoList;
