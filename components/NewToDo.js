import { useState } from 'react';

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const NewTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      dueDate: dueDate || null,
      priority,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setTitle('');
    setDueDate('');
    setPriority('medium');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/30">
      <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl bg-violet-50 px-5 py-4 shadow-inner shadow-slate-200/10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">New task</p>
          <p className="mt-2 text-sm text-slate-600">Add work, deadlines, and tags in one place.</p>
        </div>
        <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700">Fast entry</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700">Task</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separate with commas, e.g. work, research"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
      >
        Add task
      </button>
    </form>
  );
};

export default NewTodoForm;
