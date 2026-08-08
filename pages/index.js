// pages/index.js
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewToDo';
import { getCurrentUser, signOutUser, loadTodosForUser, saveTodosForUser } from '../lib/auth';

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const SORT_OPTIONS = {
  MANUAL: 'manual',
  DUE_DATE: 'dueDate',
  PRIORITY: 'priority',
  CREATED: 'createdAt',
};

const createId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.MANUAL);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      setTodos(loadTodosForUser(currentUser.email));
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      saveTodosForUser(user.email, todos);
    }
  }, [todos, user]);

  const addTodo = (todo) => {
    setTodos((current) => [
      ...current,
      {
        id: createId(),
        title: todo.title,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: todo.dueDate || null,
        priority: todo.priority || 'medium',
        tags: todo.tags || [],
      },
    ]);
  };

  const handleAddTodo = (task) => {
    const title = task.title?.trim();
    if (!title) return;
    addTodo({
      title,
      dueDate: task.dueDate || null,
      priority: task.priority || 'medium',
      tags: task.tags || [],
    });
  };

  const handleDeleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, newTitle) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleToggleComplete = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleMoveUp = (id) => {
    setTodos((current) => {
      const index = current.findIndex((todo) => todo.id === id);
      if (index <= 0) return current;
      const next = [...current];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const handleMoveDown = (id) => {
    setTodos((current) => {
      const index = current.findIndex((todo) => todo.id === id);
      if (index === -1 || index >= current.length - 1) return current;
      const next = [...current];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  };

  const handleClearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  };

  const handleSignOut = () => {
    signOutUser();
    setUser(null);
    setTodos([]);
    router.replace('/signin');
  };

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matched = todos.filter((todo) => {
      const matchesFilter =
        filter === FILTERS.ALL ||
        (filter === FILTERS.ACTIVE && !todo.completed) ||
        (filter === FILTERS.COMPLETED && todo.completed);

      const matchesQuery =
        !normalizedQuery ||
        todo.title.toLowerCase().includes(normalizedQuery) ||
        todo.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        (todo.dueDate || '').toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });

    if (sortBy === SORT_OPTIONS.MANUAL) {
      return matched;
    }

    return [...matched].sort((a, b) => {
      if (sortBy === SORT_OPTIONS.DUE_DATE) {
        const aDate = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
        const bDate = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
        return aDate - bDate;
      }

      if (sortBy === SORT_OPTIONS.PRIORITY) {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority || 'medium'] - order[b.priority || 'medium'];
      }

      if (sortBy === SORT_OPTIONS.CREATED) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return 0;
    });
  }, [todos, filter, query, sortBy]);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <Layout>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/30 ring-1 ring-slate-200/70">
          <div className="mb-8 space-y-4">
            <div className="inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">
              Personal workflow
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Run every day with a smarter task routine
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Organize your work with clarity and speed. This personalized dashboard helps you capture tasks, assign priorities, track due dates, and focus on what matters most.
            </p>
            {user && (
              <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span>Signed in as</span>
                <span className="font-semibold text-slate-950">{user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="rounded-full bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {user ? (
            <>
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Focus</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">{activeCount}</p>
                  <p className="mt-2 text-sm text-slate-600">Active tasks waiting for action.</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Completed</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">{completedCount}</p>
                  <p className="mt-2 text-sm text-slate-600">Tasks you’ve successfully finished.</p>
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-inner shadow-slate-200/40">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick controls</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Search, filter, and sort your tasks instantly.
                    </p>
                  </div>
                  <button
                    onClick={handleClearCompleted}
                    className="rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                  >
                    Clear completed
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-4 shadow-sm shadow-slate-200/40">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Filter</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.values(FILTERS).map((value) => (
                        <button
                          key={value}
                          onClick={() => setFilter(value)}
                          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                            filter === value
                              ? 'bg-violet-500 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {value === FILTERS.ALL && 'All'}
                          {value === FILTERS.ACTIVE && 'Active'}
                          {value === FILTERS.COMPLETED && 'Completed'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-4 shadow-sm shadow-slate-200/40">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Search</p>
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search tasks"
                      className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
                    />
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-4 shadow-sm shadow-slate-200/40">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sort by</p>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
                    >
                      <option value={SORT_OPTIONS.MANUAL}>Manual order</option>
                      <option value={SORT_OPTIONS.DUE_DATE}>Due date</option>
                      <option value={SORT_OPTIONS.PRIORITY}>Priority</option>
                      <option value={SORT_OPTIONS.CREATED}>Newest first</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
                <div className="space-y-6">
                  <NewTodoForm onAdd={handleAddTodo} />
                  <TodoList
                    todos={filteredTodos}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                    onToggleComplete={handleToggleComplete}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                  />
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-inner shadow-slate-200/40">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Insights</p>
                  <p className="mt-3 text-sm text-slate-600">
                    Use the form to capture new tasks, then organize them with filters and sorting. Your list is saved automatically while you stay signed in.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
                <h2 className="text-lg font-semibold text-slate-950">Professional task planning</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Sign in to save your personalized task list, maintain progress across devices, and turn daily priorities into consistent execution.
                </p>
                <ul className="mt-5 space-y-3 text-slate-600">
                  <li>• Persistent task storage for each user</li>
                  <li>• Clear due date and priority management</li>
                  <li>• Precise search, filtering, and sorting</li>
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
                <h2 className="text-lg font-semibold text-slate-950">Secure and simple onboarding</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Create your account or sign in to unlock a polished task dashboard designed for focus, accountability, and everyday productivity.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="/signup"
                    className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                  >
                    Get started
                  </a>
                  <a
                    href="/signin"
                    className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30 ring-1 ring-slate-200/70">
          <div className="relative h-80 w-full overflow-hidden rounded-[1.75rem] bg-slate-100 sm:h-96">
            <Image
              src="/task.jpg"
              alt="Task planning illustration"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
