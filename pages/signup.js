import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getCurrentUser, registerUser } from '../lib/auth';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
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
    const result = registerUser({ name, email, password });
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push('/');
  };

  return (
    <Layout>
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/30 ring-1 ring-slate-200/70">
        <h1 className="text-4xl font-semibold text-slate-950">Create account</h1>
        <p className="mt-3 text-sm text-slate-600">Set up access to your own saved tasks and workflow.</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-400"
              required
            />
          </div>

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
            Create account
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <a href="/signin" className="font-semibold text-violet-300 hover:text-violet-100">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
