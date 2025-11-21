import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

export default function LoginComponent() {
  let session, status;
  if (typeof useSession === 'function') {
    const sessionResult = useSession();
    if (sessionResult) {
      session = sessionResult.data;
      status = sessionResult.status;
    }
  }
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // if already logged in, redirect to role-based dashboard
    if (status === 'authenticated' && session?.user?.role) {
      if (session.user.role === 'root') router.replace('/dashboard/root');
      else if (session.user.role === 'owner') router.replace('/dashboard/owner');
      else if (session.user.role === 'customer') router.replace('/dashboard/customer');
      else router.replace('/');
    }
  }, [status, session, router]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!res.ok) setError("Invalid credentials");
    // No redirect here; let useEffect handle it after session updates
  }

  function handleLogout() {
    try {
      signOut();
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out. Please try again.');
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (typeof status === 'undefined') {
    return <div>Session unavailable. Please refresh or contact support.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {status === 'authenticated' ? (
          <div className="mb-6">
            <div className="mb-2">
              Currently logged in as <strong>{session?.user?.name || session?.user?.email}</strong> (<em>{session?.user?.role}</em>).
            </div>
            <button onClick={handleLogout} className="px-3 py-1 border rounded">
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="max-w-lg">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full mb-4 px-2 py-1 border rounded"
            />
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full mb-4 px-2 py-1 border rounded"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Login</button>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}