import { useState, useEffect } from 'react';

const priorityStyles = {
  high: 'bg-rose-500/10 text-rose-300',
  medium: 'bg-violet-500/10 text-violet-300',
};

const TaskItem = ({ task, completed, onEdit, onMoveUp, onMoveDown, onDelete, onToggleComplete, isFirst, isLast }) => {
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
      onEdit(task.id, newTitle.trim());
      setEditMode(false);
    }
  };

  const handleCancelEdit = () => {
    if (task) {
      setNewTitle(task.title);
    }
    setEditMode(false);
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
    return null;
  }

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/20">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-b from-violet-500/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          {editMode ? (
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <div className="space-y-3">
              <div className={`text-xl font-semibold ${completed ? 'text-slate-500 line-through' : 'text-slate-950'}`}>
                {task.title}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {task.dueDate ? (
                  <span className="rounded-2xl bg-slate-100 px-3 py-1 text-slate-600">Due: {task.dueDate}</span>
                ) : null}
                <span className={`rounded-2xl px-3 py-1 text-sm font-semibold ${priorityStyles[task.priority || 'medium']}`}>
                  {task.priority?.toUpperCase() || 'MEDIUM'}
                </span>
                {task.tags?.length > 0 && (
                  <span className="inline-flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span key={tag} className="rounded-2xl bg-slate-100 px-3 py-1 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggleComplete}
              className="h-5 w-5 rounded border-slate-300 bg-white text-violet-400 focus:ring-violet-400"
            />
            Done
          </label>

          {editMode ? (
            <>
              <button onClick={handleSaveEdit} className="rounded-3xl bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
                Save
              </button>
              <button onClick={handleCancelEdit} className="rounded-3xl bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEditTodo} className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                Edit
              </button>
              <button
                onClick={() => onMoveUp(task.id)}
                disabled={isFirst}
                aria-label="Move task up"
                className="rounded-3xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↑
              </button>
              <button
                onClick={() => onMoveDown(task.id)}
                disabled={isLast}
                aria-label="Move task down"
                className="rounded-3xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↓
              </button>
            </>
          )}

          <button onClick={handleDeleteTask} className="rounded-3xl bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
