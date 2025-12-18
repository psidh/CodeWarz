'use client';
import { problems } from '@/problems/details/detail';
import Link from 'next/link';
import {useEffect} from "react";
import {useRouter} from "next/navigation"
export default function Page() {
  const router = useRouter();
  useEffect(() => {
      router.refresh();
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center mt-34">
      <div className="w-full max-w-3xl px-6">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">
          Contest Problems
        </h1>

        <div className="space-y-3">
          {problems.map((p) => (
            <Link key={p.problemId} href={`/problems/${p.problemId}`} className="block">
              <div className="flex items-center justify-between border border-white/20 rounded-lg px-4 py-3 hover:border-neutral-500 transition">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-mono font-bold">{p.problemId}</span>
                  <span className="text-lg">{p.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
