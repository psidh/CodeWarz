'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Invalid server response');
      }

      if (!res.ok) {
        throw new Error(data?.message || 'Registration failed');
      }

      toast.success('Account created successfully');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex-col flex gap-4 items-center justify-center bg-black text-white">
      <div className="w-96 p-6 bg-white/5 border border-white/10 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

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
          disabled={loading}
          className="cursor-pointer w-full py-2 bg-blue-600 rounded font-semibold disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>

      <p>
        Already a User? Please{' '}
        <a
          href="/login"
          className="text-blue-500 underline underline-offset-4 hover:text-white"
        >
          Login
        </a>
      </p>
    </div>
  );
}
