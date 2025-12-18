"use client";

import { problems } from "@/lib/details/detail";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountDown";
import { useAuth } from "@/context/AuthContext";

// lucide icons
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function Page() {
  const { userId } = useAuth();
  const [verdicts, setVerdicts] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/submissions/solved?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setVerdicts(data.verdicts || {}));
  }, [userId]);

  useEffect(() => {
    router.refresh();
  }, []);

  const verdictMeta = (verdict?: string) => {
    switch (verdict) {
      case "AC":
        return {
          bg: "bg-green-900/40 border-green-700",
          text: "text-green-400",
          icon: <CheckCircle className="w-5 h-5 text-green-400" />,
        };
      case "WA":
        return {
          bg: "bg-red-900/40 border-red-700",
          text: "text-red-400",
          icon: <XCircle className="w-5 h-5 text-red-400" />,
        };
      default:
        return verdict
          ? {
              bg: "bg-yellow-900/40 border-yellow-700",
              text: "text-yellow-400",
              icon: <Clock className="w-5 h-5 text-yellow-400" />,
            }
          : {
              bg: "border border-neutral-600 hover-border-neutral-200",
              text: "",
              icon: null,
            };
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-12">
      <div className="flex items-start justify-between w-4/5 mx-auto">
        {/* Problems */}
        <div className="w-full max-w-3xl px-6">
          <h1 className="text-5xl font-bold mb-12 tracking-tight text-center">
            Problems
          </h1>

          <div className="space-y-3">
            {problems.map((p) => {
              const meta = verdictMeta(verdicts[p.problemId]);

              return (
                <Link
                  key={p.problemId}
                  href={`/problems/${p.problemId}`}
                  className="block"
                >
                  <div
                    className={`border flex items-center justify-between rounded-lg px-6 py-4 transition
                      ${meta.bg} hover:opacity-90`}
                  >
                    <div className="flex items-baseline w-full justify-between gap-8">
                      <p className="text-3xl font-bold">{p.problemId}</p>

                      <div className="flex justify-between w-9/10 items-center">
                        <p className="text-2xl font-extralight">{p.title}</p>

                        {verdicts[p.problemId] && (
                          <div className="flex items-center gap-2">
                            {meta.icon}
                            <span
                              className={`text-lg font-semibold ${meta.text}`}
                            >
                              {verdicts[p.problemId]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
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
