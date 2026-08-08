import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getCurrentUser, signInUser } from '../lib/auth';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (getCurrentUser()) {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signInUser(email, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push('/');
  };

  return (
    <Layout>
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/30 ring-1 ring-slate-200/70">
        <h1 className="text-4xl font-semibold text-slate-950">Sign in</h1>
        <p className="mt-3 text-sm text-slate-600">Access your personal task list and continue where you left off.</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
              required
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button className="w-full rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">
            Sign in
          </button>

          <p className="text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <a href="/signup" className="font-semibold text-violet-300 hover:text-violet-100">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
