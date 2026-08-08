import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/30 ring-1 ring-slate-200/70">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">About</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              A polished task management experience
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              This service gives you a clear, easy-to-use task workspace where you can add todos, set due dates, and organize priorities. It keeps your daily plan simple and your work moving forward.
            </p>
            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-100 p-6 text-slate-900 shadow-sm shadow-slate-200/40">
              <h2 className="text-lg font-semibold text-slate-950">What this app does</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                It provides a personal task dashboard that saves your list to your account and keeps your priorities organized. The result is a smooth workflow experience for everyday productivity.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
              <h2 className="text-lg font-semibold text-slate-950">Features</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Sign up and sign in for personal task persistence</li>
                <li>• Add, edit, and complete todos with one click</li>
                <li>• Sort, search, and filter tasks instantly</li>
                <li>• Track due dates, priorities, and tags in a single view</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
              <h2 className="text-lg font-semibold text-slate-950">What this service delivers</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• A secure personal task management workspace</li>
                <li>• Clean onboarding for new users and fast task capture</li>
                <li>• Persistent todo storage tied to each signed-in account</li>
                <li>• A calm, professional interface designed for focus</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
            <h2 className="text-lg font-semibold text-slate-950">Why this app?</h2>
            <p className="mt-4 text-slate-600 leading-7">
              It is built to help you stay on top of your tasks without distractions. The interface stays clean, your list is saved to your account, and your priorities remain easy to review.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
