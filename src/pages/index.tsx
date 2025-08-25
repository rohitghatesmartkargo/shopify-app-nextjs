// pages/index.tsx
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | My Next.js App</title>
      </Head>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to Next.js with Pages Router 🚀
        </h1>
        <p className="mt-4 text-gray-700">
          Edit <code className="bg-gray-200 px-1 rounded">pages/index.tsx</code> to get started.
        </p>
      </div>
    </>
  );
}
