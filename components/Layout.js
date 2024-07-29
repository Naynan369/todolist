import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>To-Do List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg mx-auto pt-8 pb-12 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
