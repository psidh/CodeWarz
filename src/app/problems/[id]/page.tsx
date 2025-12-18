"use client";

import { usePathname } from "next/navigation";
import { problems } from "@/problems/details/detail";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function ProblemPage() {
  const { userId, loggedIn, loading } = useAuth();

  if (loading) return null;
  if (!loggedIn || !userId) return null;

  const pathname = usePathname().split("/");
  const problemId = pathname[pathname.length - 1];
  const problem = problems.find((p) => p.problemId === problemId);

  const [file, setFile] = useState<File | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function fetchSubmissions() {
    if (!userId) return;

    setLoadingSubs(true);
    try {
      const res = await fetch(
        `/api/submissions?userId=${userId}&problemId=${problemId}`
      );
      const data = await res.json();

      if (res.ok) {
        setSubmissions(data.submissions);
      }
    } catch {
      toast.error("Failed to load submissions");
    } finally {
      setLoadingSubs(false);
    }
  }

  useEffect(() => {
    fetchSubmissions();
  }, [userId, problemId]);

  async function submit() {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("problemId", problemId);
    formData.append("userId", userId);

    setSubmitting(true);
    toast.loading("Running code...", { id: "judge" });

    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      toast.dismiss("judge");

      if (res.status == 400) {
        toast.error("Unsupported Language Genius");
        return;
      }
      if (res.status == 429) {
        toast.error("Please wait for 30 sec before submitting");
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "Execution failed");
        return;
      }
      
      toast.success(`Verdict: ${data.verdict}`);
      await fetchSubmissions();
    } catch {
      toast.dismiss("judge");
      toast.error("Judge server unreachable");
    } finally {
      setSubmitting(false);
    }
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Problem not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{problem.title}</h1>

        <problem.Content />

        {/* Upload */}
        <div className="mt-10 border border-white/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Solution</h2>

          <input
            title="ti"
            type="file"
            accept=".py,.java, .cpp, .c, .rs, .js"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-zinc-800
              hover:file:bg-blue-800 transition duration-200"
          />

          {file && (
            <p className="mt-3 text-sm text-green-400">Selected: {file.name}</p>
          )}

          <button
            disabled={submitting}
            onClick={submit}
            className={`mt-6 px-6 py-2 rounded-lg font-semibold transition
              ${
                submitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {submitting ? "Running..." : "Submit"}
          </button>
        </div>

        {/* Submissions */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Your Submissions</h2>

          {loadingSubs && <p className="text-gray-400">Loading...</p>}
          {!loadingSubs && submissions.length === 0 && (
            <p className="text-gray-500">No submissions yet.</p>
          )}

          <div className="space-y-3">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="flex justify-between items-center
                           border border-white/20 rounded-lg px-4 py-3"
              >
                <span className="font-mono text-sm text-gray-400">
                  {new Date(s.createdAt).toLocaleString()}
                </span>

                <span className={`font-bold `}>{s.points}</span>
                <span
                  className={`font-bold ${
                    s.verdict === "AC"
                      ? "text-green-400"
                      : s.verdict === "WA"
                      ? "text-red-400"
                      : s.verdict === "TLE"
                      ? "text-yellow-400"
                      : s.verdict === "CE"
                      ? "text-purple-400"
                      : "text-gray-400"
                  }`}
                >
                  {s.verdict}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
