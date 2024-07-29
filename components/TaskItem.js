import { useState, useEffect } from 'react';

const TaskItem = ({ task, completed, onEdit, onMoveUp, onMoveDown, onDelete, onToggleComplete }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (task) {
      setNewTitle(task.title);
    }
  }, [task]);

  const handleEditTodo = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    if (task && newTitle.trim()) {
      onEdit(task.id, newTitle);
      setEditMode(false);
    }
  };

  const handleCancelEdit = () => {
    if (task) {
      setNewTitle(task.title);
    }
    setEditMode(false);
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleMoveUp = () => {
    if (task) {
      onMoveUp(task.id);
    }
  };

  const handleMoveDown = () => {
    if (task) {
      onMoveDown(task.id);
    }
  };

  const handleDeleteTask = () => {
    if (task) {
      onDelete(task.id);
    }
  };

  const handleToggleComplete = () => {
    if (task) {
      onToggleComplete(task.id);
    }
  };

  if (!task) {
    return null; // Return null or a placeholder if task is undefined
  }

  return (
    <div className="flex items-center justify-between border p-2 mb-2">
      {editMode ? (
        <input
          type="text"
          className="border rounded py-1 px-2 mr-2"
          value={newTitle}
          onChange={handleChange}
        />
      ) : (
        <div className={completed ? 'line-through' : ''}>{task.title}</div>
      )}
      <div className="flex space-x-2">
        {editMode ? (
          <>
            <button onClick={handleSaveEdit} className="text-green-500">Save</button>
            <button onClick={handleCancelEdit} className="text-red-500">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditTodo} className="text-blue-500">Edit</button>
            <button onClick={handleMoveUp} className="text-green-500">&uarr;</button>
            <button onClick={handleMoveDown} className="text-red-500">&darr;</button>
          </>
        )}
        <button onClick={handleDeleteTask} className="text-red-500">Delete</button>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleComplete}
          className="form-checkbox h-5 w-5 text-blue-500 rounded focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TaskItem;
