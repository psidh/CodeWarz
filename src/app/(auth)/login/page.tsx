'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, loggedIn, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && loggedIn) {
    router.replace('/');
    return null;
  }

  async function submit() {
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Login failed');
      }

      // 🔑 sync client state immediately
      login(data.userId);

      toast.success('Successfully logged in');
      router.replace('/problems');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex-col flex gap-4 items-center justify-center bg-black text-white">
      <div className="w-96 p-6 bg-white/5 border border-white/10 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Login In</h1>

        <input
          className="w-full mb-3 p-2 bg-black border border-white/20 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 bg-black border border-white/20 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={submitting}
          className="cursor-pointer w-full py-2 bg-blue-600 rounded font-semibold disabled:opacity-60"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <p>
        New User? Please{' '}
        <a
          href="/register"
          className="text-blue-500 underline underline-offset-4 hover:text-white"
        >
          Register
        </a>
      </p>
    </div>
  );
}
