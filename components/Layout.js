import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser, signOutUser } from '../lib/auth';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSignOut = () => {
    signOutUser();
    setUser(null);
    router.replace('/signin');
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Head>
        <title>To-Do List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white/95 px-6 py-4 shadow-sm shadow-slate-200/40 ring-1 ring-slate-200/70 sm:px-8">
            <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-800">
              <span>Todo app</span>
              <a href="/" className="rounded-full bg-slate-100 px-4 py-2 text-slate-950 transition hover:bg-slate-200">
                Home
              </a>
              <a href="/about" className="rounded-full bg-violet-50 px-4 py-2 text-violet-700 transition hover:bg-violet-100">
                About
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="rounded-full bg-violet-50 px-4 py-2 text-violet-700 transition hover:bg-violet-100"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <a href="/signin" className="rounded-full bg-slate-100 px-4 py-2 text-slate-950 transition hover:bg-slate-200">
                    Sign in
                  </a>
                  <a href="/signup" className="rounded-full bg-violet-50 px-4 py-2 text-violet-700 transition hover:bg-violet-100">
                    Sign up
                  </a>
                </>
              )}
            </div>
          </nav>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
