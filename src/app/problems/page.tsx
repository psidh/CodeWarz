"use client";
import { problems } from "@/lib/details/detail";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountDown";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center mt-12">
      <div className="flex items-start justify-between w-4/5 mx-auto">
        <div className="w-full max-w-3xl px-6">
          <h1 className="text-5xl font-bold mb-12 tracking-tight w-full text-center">
            Problems
          </h1>

          <div className="space-y-3">
            {problems.map((p) => (
              <Link
                key={p.problemId}
                href={`/problems/${p.problemId}`}
                className="block"
              >
                <div className="flex items-center justify-between border border-white/20 rounded-lg px-6 py-4 hover:border-neutral-500 transition">
                  <div className="flex items-center gap-8">
                    <span className="text-3xl font-bold">{p.problemId}</span>
                    <span className="text-2xl font-extralight">{p.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <CountdownTimer />
          <div className="font-semibold text-neutral-500 h-[50vh] flex flex-col items-center justify-center">
            <h1>Leaderboard will be displayed here soon...</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
